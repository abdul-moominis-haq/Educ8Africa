import PropTypes from 'prop-types';
import { useState } from 'react';
import Modal from './Modal';
import NssApplyCard from './NssApplyCard';
import { FaMapMarkerAlt, FaBriefcase, FaUser, FaMoneyBillWave } from 'react-icons/fa';

const NssModalContent = ({ posting, darkMode }) => {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const handleApply = () => {
    setIsApplyModalOpen(true);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="border-b pb-3 sm:pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-3 sm:mb-4 leading-tight">{posting.jobTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="flex items-center gap-2 text-sm sm:text-base">
            <FaMapMarkerAlt className="text-red-600 flex-shrink-0" />
            <span className="truncate">{posting.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm sm:text-base">
            <FaBriefcase className="text-red-600 flex-shrink-0" />
            <span className="truncate">{posting.department}</span>
          </div>
          <div className="flex items-center gap-2 text-sm sm:text-base">
            <FaUser className="text-red-600 flex-shrink-0" />
            <span className="truncate">Reports to: {posting.reportsTo}</span>
          </div>
          <div className="flex items-center gap-2 text-sm sm:text-base">
            <FaMoneyBillWave className="text-red-600 flex-shrink-0" />
            <span className="truncate">{posting.compensation}</span>
          </div>
          {posting.jobType && (
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <FaBriefcase className="text-red-600 flex-shrink-0" />
              <span className="truncate">Type: {posting.jobType}</span>
            </div>
          )}
        </div>
      </div>

      {/* Company Overview
      {posting.company && posting.company.description && (
        <div>
          <h3 className="text-base sm:text-lg font-semibold mb-2">About {posting.company.name || 'The Company'}</h3>
          <p className="text-xs sm:text-sm leading-relaxed">{posting.company.description}</p>
        </div>
      )} */}

      <div>
        <h3 className="text-base sm:text-lg font-semibold mb-2">Role Overview</h3>
        <p className="text-xs sm:text-sm leading-relaxed">{posting.roleOverview}</p>
      </div>

      <div>
        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Key Responsibilities</h3>
        <div className="space-y-3 sm:space-y-4">
          {Object.entries(posting.keyResponsibilities).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-medium text-red-600 mb-2 text-sm sm:text-base">
                {category.replace(/([A-Z])/g, ' $1').trim()}
              </h4>
              <ul className="list-disc pl-4 sm:pl-5 space-y-1">
                {items.map((item, index) => (
                  <li key={index} className="text-xs sm:text-sm leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Qualifications Section */}
      {posting.qualifications && (
        <div>
          <h3 className="text-base sm:text-lg font-semibold mb-3">Qualifications</h3>
          <div className="space-y-3">
            {typeof posting.qualifications === 'object' ? (
              Object.entries(posting.qualifications).map(([category, content]) => (
                <div key={category}>
                  <h4 className="font-medium text-red-600 mb-2 text-sm sm:text-base">
                    {category.replace(/([A-Z])/g, ' $1').trim()}
                  </h4>
                  {Array.isArray(content) ? (
                    <ul className="list-disc pl-4 sm:pl-5 space-y-1">
                      {content.map((item, index) => (
                        <li key={index} className="text-xs sm:text-sm leading-relaxed">{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs sm:text-sm leading-relaxed pl-4">{content}</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-xs sm:text-sm leading-relaxed">{posting.qualifications}</p>
            )}
          </div>
        </div>
      )}

      {/* Skills Section */}
      {posting.skills && (
        <div>
          <h3 className="text-base sm:text-lg font-semibold mb-3">Required Skills</h3>
          {Array.isArray(posting.skills) ? (
            <ul className="list-disc pl-4 sm:pl-5 space-y-1">
              {posting.skills.map((skill, index) => (
                <li key={index} className="text-xs sm:text-sm leading-relaxed">{skill}</li>
              ))}
            </ul>
          ) : (
            <p className="text-xs sm:text-sm leading-relaxed">{posting.skills}</p>
          )}
        </div>
      )}

      {/* Team Structure Section */}
      {posting.teamStructure && (
        <div>
          <h3 className="text-base sm:text-lg font-semibold mb-3">Team Structure</h3>
          <div className="space-y-2">
            {typeof posting.teamStructure === 'object' ? (
              Object.entries(posting.teamStructure).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2 text-sm sm:text-base">
                  <span className="font-medium text-red-600">
                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                  </span>
                  <span>{value}</span>
                </div>
              ))
            ) : (
              <p className="text-xs sm:text-sm leading-relaxed">{posting.teamStructure}</p>
            )}
          </div>
        </div>
      )}

      {/* Benefits Section */}
      {posting.benefits && (
        <div>
          <h3 className="text-base sm:text-lg font-semibold mb-3">Benefits & Opportunities</h3>
          {Array.isArray(posting.benefits) ? (
            <ul className="list-disc pl-4 sm:pl-5 space-y-1">
              {posting.benefits.map((benefit, index) => (
                <li key={index} className="text-xs sm:text-sm leading-relaxed">{benefit}</li>
              ))}
            </ul>
          ) : (
            <p className="text-xs sm:text-sm leading-relaxed">{posting.benefits}</p>
          )}
        </div>
      )}

      {posting.application && (
        <div>
          <h3 className="text-base sm:text-lg font-semibold mb-2">How to Apply</h3>
          <p className="text-xs sm:text-sm mb-2">Deadline: {posting.application.deadline}</p>
          <p className="text-xs sm:text-sm mb-2">{posting.application.instructions}</p>
          {posting.application.subjectLine && (
            <p className="text-xs sm:text-sm font-medium text-red-600">
              Subject Line: {posting.application.subjectLine}
            </p>
          )}
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-3 sm:pt-4 border-t">

        <button
          onClick={handleApply}
          className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm sm:text-base font-medium"
        >
          Apply Now
        </button>
      </div>

      {/* Apply Modal */}
      <NssApplyCard
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        jobTitle={posting.jobTitle}
        darkMode={darkMode}
      />
    </div>
  );
};

NssModalContent.propTypes = {
  posting: PropTypes.object.isRequired,
  darkMode: PropTypes.bool
};

const NssModal = ({ isOpen, onClose, posting, darkMode }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      darkMode={darkMode}
      size="responsive"
      title={posting.jobTitle}
    >
      <NssModalContent posting={posting} darkMode={darkMode} />
    </Modal>
  );
};

NssModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  posting: PropTypes.object.isRequired,
  darkMode: PropTypes.bool.isRequired
};

export default NssModal;
