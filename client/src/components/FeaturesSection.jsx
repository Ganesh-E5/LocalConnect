import React from 'react';

const FeaturesSection = ({ bgColor, sectionHead, sectionPara, features }) => {
  return (
    <div className={`${bgColor} flex flex-col justify-center items-center p-20 box-border w-full overflow-x-hidden`}>
      <div className='flex flex-col justify-center items-center text-center'>
        <h2 className='text-4xl font-bold text-white mb-10'>{sectionHead}</h2>
        <p className='max-w-[60%] text-gray-300 text-lg'>{sectionPara}</p>
      </div>

      <div className='flex flex-wrap justify-center items-stretch gap-10 mt-10 w-full box-border'>
        {features.map((feature, index) => (
          <div
            key={index}
            className='flex flex-col justify-start items-center text-center bg-slate-800 p-5 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 min-w-[22%] max-w-[30%] box-border'
          >
            <div className='flex flex-col justify-start items-center'>
              <div>{feature.icon}</div>
              <h3 className="text-white text-xl font-semibold mt-3">{feature.head}</h3>
            </div>
            <p className="text-gray-300 text-base mt-2">
              {feature.para}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;