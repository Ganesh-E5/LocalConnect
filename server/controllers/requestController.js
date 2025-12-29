const Request = require('../models/Request');
const User = require('../models/User');
const ServiceCategory = require('../models/ServiceCategory');

const createRequest = async (req, res) => {
    try {
        const { serviceType, description, location } = req.body||{};
        if (!serviceType || !description || !location) {
            return res.status(400).json({ message: "All fields are required" });
        a}
        const categories = await ServiceCategory.find({});
        const allValidSkills = categories.flatMap(cat => cat.skills.map(skill => skill.toLowerCase()));

        if (!allValidSkills.includes(serviceType.toLowerCase())) {
            return res.status(400).json({ message: 'Invalid service type selected' });
        }

        const newRequest = new Request({
            requesteduser: req.user.id,
            serviceType,
            createdAt: new Date(),
            description,
            location,
            status: 'Pending',
        });

        const saved = await newRequest.save();

        await User.findByIdAndUpdate(
            req.user.id,
            { $addToSet: { requests: saved._id } },
            { new: true }
        );

        res.status(201).json({ message: 'Request created', request: saved });
    } catch (err) {
        console.error('Request creation error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

const getRequests = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const skills = user.skills || [];


        if (skills.length === 0) {
            return res.status(200).json({ message: 'No services you can provide', requests: [] });
        }

        const requests = await Request.find({
            serviceType: { $in: skills },
            status: 'Pending',
        })
            .populate('requesteduser', 'name')
            .sort({ createdAt: -1 })
            .lean();

        res.status(200).json({ requests });
    } catch (err) {
        console.error('Error fetching requests:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

const getMyRequests = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.requests || user.requests.length === 0) {
            return res.status(200).json({ message: 'You have no requests', requests: [] });
        }

        const requests = await Request.find({
            _id: { $in: user.requests },
        })
        .populate({
            path: 'accepteduser',
            select: 'name',
            match: { status: { $ne: 'pending' } }
        })
        .sort({ createdAt: -1 });

        res.status(200).json({ message: "Requests fetched", requests });
    } catch (err) {
        console.error('Error fetching user requests:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

const acceptRequest = async (req, res) => {
    try {
        const requestId = req.params.id;
        const userId = req.user.id; 
        const user = await User.findById(userId);
        
        const request = await Request.findById(requestId).populate('requesteduser', '_id'); 

        if (!request) {
            return res.status(404).json({ message: "Request not found" });
        }
        if (request.status !== 'Pending') {
            return res.status(409).json({ message: "Request is no longer available to accept" });
        }

        if (!user.skills.includes(request.serviceType)) {
            return res.status(403).json({ message: "You are not qualified to accept this request" });
        }

        request.status = 'Accepted';
        request.acceptedAt = new Date();
        request.accepteduser = userId;

        await request.save();

        await User.findByIdAndUpdate(userId, {
            $addToSet: { acceptedRequests: request._id },
        });


        const populated = await Request.findById(request._id)
            .populate('requesteduser', 'name email')
            .populate('accepteduser', 'name email');
            
        res.status(200).json({ 
            message: 'Request accepted and new chat created', 
            request: populated 
        });
        
    } catch (err) {
        console.error('Accept request error:', err); 
        res.status(500).json({ message: 'Server error' });
    }
};

const getAssignedRequests = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const requests = await Request.find({ _id: { $in: user.acceptedRequests } })
            .populate('requesteduser', 'name email phno')
            .sort({ createdAt: -1 })
            .lean();

        res.status(200).json({ requests });
    } catch (err) {
        console.error('Error fetching assigned requests:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

const markRequestComplete = async (req, res) => {
    try {
        const requestId = req.params.id;
        const userId = req.user.id;
        const request = await Request.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: "Request not found" });
        }
        if (request.accepteduser?.toString() !== userId) {
            return res.status(403).json({ message: "You are not authorized to complete this request" });
        }
        request.status = "Completed";
        request.completedAt = new Date();
        await request.save();
        res.status(200).json({ message: "Request marked as completed", request });
    } catch (err) {
        console.error("Error marking request complete:", err);
        res.status(500).json({ message: "Server error" });
    }
};


module.exports = {
    createRequest,
    getRequests,
    getMyRequests,
    acceptRequest,
    getAssignedRequests,
    markRequestComplete,
};