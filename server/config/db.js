const mongoose = require('mongoose');
const ServiceCategory = require('../models/ServiceCategory');
const User = require('../models/User');
const Request = require('../models/Request');

const categories = [
  {
    name: 'Home',
    skills: ['Plumber', 'Electrician', 'Carpenter', 'Painter', 'Mechanic', 'AC repair', 'Internet', 'Gas service']
  },
  {
    name: 'Household',
    skills: ['Maid', 'Cook', 'Driver', 'Babysitter', 'Laundry', 'Cleaning', 'Gardener']
  },
  {
    name: 'Event',
    skills: ['Musician', 'DJ', 'Event planner', 'Decorator', 'Photographer', 'Caterer', 'Sound technician']
  },
  {
    name: 'Education',
    skills: ['Tutor', 'Dance teacher', 'Music teacher', 'Art teacher', 'Yoga instructor', 'Fitness trainer']
  },
  {
    name: 'Miscellaneous',
    skills: ['Security', 'Technician', 'Delivery assistance', 'Elder care', 'Therapist', 'Pet care', 'Computer repair']
  }
];

const users = [
  { name: 'Sample User', email: 'sample_user@example.com', phno: '9998887777', password: '111111', skills: [], location: 'Hayathnagar' },
  { name: 'Demo Electrician',email: 'demo.electrician@example.com',phno: '8887776666',password: '111111',skills: ['Electrician','AC repair'],location: 'Hayathnagar' },


  { name: 'Ravi Kumar', email: 'ravi.kumar@example.com', phno: '9000000001', password: '111111', skills: [], location: 'Hayathnagar' },
  { name: 'Sita Reddy', email: 'sita.reddy@example.com', phno: '9000000002', password: '111111', skills: [], location: 'Hayathnagar' },
  { name: 'Amit Sharma', email: 'amit.sharma@example.com', phno: '9000000003', password: '111111', skills: [], location: 'Hayathnagar' },
  { name: 'Neha Verma', email: 'neha.verma@example.com', phno: '9000000004', password: '111111', skills: [], location: 'Hayathnagar' },
  { name: 'Rahul Singh', email: 'rahul.singh@example.com', phno: '9000000005', password: '111111', skills: [], location: 'Hayathnagar' },

  { name: 'David Plumber', email: 'david.plumber@example.com', phno: '1111111111', password: '111111', skills: ['Plumber'], location: 'Hayathnagar' },
  { name: 'Eve Electrician', email: 'eve.electrician@example.com', phno: '1111111112', password: '111111', skills: ['Electrician', 'AC repair'], location: 'Hayathnagar' },
  { name: 'Frank Carpenter', email: 'frank.carpenter@example.com', phno: '1111111113', password: '111111', skills: ['Carpenter'], location: 'Hayathnagar' },

  { name: 'Grace Maid', email: 'grace.maid@example.com', phno: '1111111114', password: '111111', skills: ['Maid'], location: 'Hayathnagar' },
  { name: 'Harry Cook', email: 'harry.cook@example.com', phno: '1111111115', password: '111111', skills: ['Cook'], location: 'Hayathnagar' },

  { name: 'Ivy DJ', email: 'ivy.dj@example.com', phno: '1111111116', password: '111111', skills: ['DJ'], location: 'Hayathnagar' },
  { name: 'Jack Photographer', email: 'jack.photographer@example.com', phno: '1111111117', password: '111111', skills: ['Photographer'], location: 'Hayathnagar' },

  { name: 'Karen Tutor', email: 'karen.tutor@example.com', phno: '1111111118', password: '111111', skills: ['Tutor'], location: 'Hayathnagar' },
  { name: 'Leo DanceTeacher', email: 'leo.dance@example.com', phno: '1111111119', password: '111111', skills: ['Dance teacher'], location: 'Hayathnagar' },

  { name: 'Mona Security', email: 'mona.security@example.com', phno: '1111111120', password: '111111', skills: ['Security'], location: 'Hayathnagar' },
  { name: 'Nick Technician', email: 'nick.technician@example.com', phno: '1111111121', password: '111111', skills: ['Technician'], location: 'Hayathnagar' }
];

const requests = [
  {
    requesteduser: 'sample_user@example.com',
    accepteduser: 'frank.carpenter@example.com',
    serviceType: 'Carpenter',
    description: 'Fix broken wooden door and cupboard hinges',
    location: 'Hayathnagar',
    status: 'Accepted'
  },
  {
    requesteduser: 'sample_user@example.com',
    serviceType: 'Painter',
    description: 'Need interior wall painting for 2BHK',
    location: 'Hayathnagar',
    status: 'Pending'
  },
  {
    requesteduser: 'sample_user@example.com',
    accepteduser: 'ivy.dj@example.com',
    serviceType: 'DJ',
    description: 'DJ required for birthday party this weekend',
    location: 'Hayathnagar',
    status: 'Completed'
  },
  {
    requesteduser: 'sample_user@example.com',
    accepteduser: 'jack.photographer@example.com',
    serviceType: 'Photographer',
    description: 'Photography for small engagement ceremony',
    location: 'Hayathnagar',
    status: 'Accepted'
  },
  {
    requesteduser: 'sample_user@example.com',
    accepteduser: 'karen.tutor@example.com',
    serviceType: 'Tutor',
    description: 'Math tutor required for 10th standard student',
    location: 'Hayathnagar',
    status: 'Completed'
  },
  {
    requesteduser: 'sample_user@example.com',
    serviceType: 'Internet',
    description: 'Internet connection frequently disconnects',
    location: 'Hayathnagar',
    status: 'Pending'
  },
  {
    requesteduser: 'sample_user@example.com',
    accepteduser: 'leo.dance@example.com',
    serviceType: 'Dance teacher',
    description: 'Dance classes needed for wedding preparation',
    location: 'Hayathnagar',
    status: 'Accepted' 
  },
  {
    requesteduser: 'sample_user@example.com',
    serviceType: 'Gardener',
    description: 'Monthly garden maintenance service required',
    location: 'Hayathnagar',
    status: 'Pending'
  },
  {
    requesteduser: 'sample_user@example.com',
    accepteduser: 'nick.technician@example.com',
    serviceType: 'Technician',
    description: 'Laptop not turning on, needs diagnosis',
    location: 'Hayathnagar',
    status: 'Completed'
  },
  {
    requesteduser: 'ravi.kumar@example.com',
    serviceType: 'Electrician',
    description: 'Switch board sparking issue',
    location: 'Hayathnagar',
    status: 'Pending'
  },
  {
    requesteduser: 'sita.reddy@example.com',
    serviceType: 'Electrician',
    description: 'Ceiling fan not working',
    location: 'Hayathnagar',
    status: 'Pending'
  },
  {
    requesteduser: 'amit.sharma@example.com',
    serviceType: 'Electrician',
    description: 'New power socket installation',
    location: 'Hayathnagar',
    status: 'Pending'
  },
  {
    requesteduser: 'neha.verma@example.com',
    accepteduser: 'demo.electrician@example.com',
    serviceType: 'Electrician',
    description: 'MCB keeps tripping',
    location: 'Hayathnagar',
    status: 'Accepted'
  },
  {
    requesteduser: 'ravi.kumar@example.com',
    accepteduser: 'demo.electrician@example.com',
    serviceType: 'Electrician',
    description: 'Outdoor light wiring issue',
    location: 'Hayathnagar',
    status: 'Accepted'
  },
  {
    requesteduser: 'ravi.kumar@example.com',
    serviceType: 'Electrician',
    description: 'Switch board sparking',
    location: 'Hayathnagar',
    status: 'Pending'
  },
  {
    requesteduser: 'sita.reddy@example.com',
    serviceType: 'Electrician',
    description: 'Fan regulator not working',
    location: 'Hayathnagar',
    status: 'Pending'
  },
  {
    requesteduser: 'amit.sharma@example.com',
    serviceType: 'AC repair',
    description: 'AC cooling issue',
    location: 'Hayathnagar',
    status: 'Pending'
  },
  {
    requesteduser: 'neha.verma@example.com',
    accepteduser: 'demo.electrician@example.com',
    serviceType: 'Electrician',
    description: 'MCB trips frequently',
    location: 'Hayathnagar',
    status: 'Accepted'
  },
  {
    requesteduser: 'rahul.singh@example.com',
    accepteduser: 'demo.electrician@example.com',
    serviceType: 'AC repair',
    description: 'AC installation needed',
    location: 'Hayathnagar',
    status: 'Accepted'
  },
  {
    requesteduser: 'ravi.kumar@example.com',
    accepteduser: 'demo.electrician@example.com',
    serviceType: 'Electrician',
    description: 'Power socket replacement',
    location: 'Hayathnagar',
    status: 'Completed'
  },
  {
    requesteduser: 'sita.reddy@example.com',
    accepteduser: 'demo.electrician@example.com',
    serviceType: 'AC repair',
    description: 'AC gas refill',
    location: 'Hayathnagar',
    status: 'Completed'
  },
  {
    requesteduser: 'demo.electrician@example.com',
    serviceType: 'Internet',
    description: 'Internet connection not working',
    location: 'Hayathnagar',
    status: 'Pending'
  }

];

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    // Seed categories
    if (await ServiceCategory.countDocuments() === 0) {
      await ServiceCategory.insertMany(categories);
      console.log('✅ Service categories seeded successfully!');
    }

    // Seed users
    if (await User.countDocuments() === 0) {
      for (const user of users) {
        const newUser = new User(user);
        await newUser.save();
      }
      console.log('✅ Users seeded successfully!');
    }

    // Seed requests
    if (await Request.countDocuments() === 0) {
      const userDocs = await User.find();
      const emailToId = {};

      userDocs.forEach(u => {
        emailToId[u.email] = u._id;
      });

      const requestsWithIds = requests.map(r => ({
        requesteduser: emailToId[r.requesteduser],
        accepteduser: r.accepteduser ? emailToId[r.accepteduser] : null,
        serviceType: r.serviceType,
        description: r.description,
        location: r.location,
        status: r.status,
        createdAt: new Date(), 
        acceptedAt: r.accepteduser ? new Date() : null,
        completedAt: r.status === 'Completed' ? new Date() : null
      }));

      const insertedRequests = await Request.insertMany(requestsWithIds);

      for (const req of insertedRequests) {
        await User.findByIdAndUpdate(req.requesteduser, {
          $addToSet: { requests: req._id }
        });

        if (req.accepteduser) {
          await User.findByIdAndUpdate(req.accepteduser, {
            $addToSet: { acceptedRequests: req._id }
          });
        }
      }

      console.log('✅ Requests seeded successfully!');
    }

  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;