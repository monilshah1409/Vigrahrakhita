import React from "react";
import { FaPhoneAlt, FaAmbulance, FaFireExtinguisher, FaHospital, FaUserShield, FaEye, FaShieldAlt, FaFemale, FaChild, FaWalking, FaUsers } from "react-icons/fa";

const emergencyContacts = [
  {
    name: "National Emergency Number",
    number: "112",
    icon: <FaPhoneAlt className="text-blue-600" />,
    description: "All-in-one emergency helpline"
  },
  {
    name: "Police",
    number: "100",
    icon: <FaShieldAlt className="text-indigo-600" />,
    description: "For law enforcement emergencies"
  },
  {
    name: "Ambulance",
    number: "108",
    icon: <FaAmbulance className="text-green-600" />,
    description: "For disaster response and rescue"
  },
  {
    name: "Fire",
    number: "101",
    icon: <FaFireExtinguisher className="text-red-600" />,
    description: "For fire emergencies"
  },
  // {
  //   name: "Disaster Management",
  //   number: "108",
  //   icon: <FaHospital className="text-yellow-600" />,
  //   description: "For disaster response and rescue"
  // },
  {
    name: "Women's Helpline",
    number: "1091",
    icon: <FaFemale className="text-pink-600" />,
    description: "For women in distress"
  },
  {
    name: "Child Helpline",
    number: "1098",
    icon: <FaChild className="text-purple-600" />,
    description: "For child protection services"
  },
  {
    name: "Senior Citizen Helpline",
    number: "14567",
    icon: <FaWalking className="text-orange-600" />,
    description: "For senior citizen assistance"
  },
  {
    name: "VigrahaRakṣitā Team",
    number: "9913140919",
    icon: <FaUsers className="text-teal-600" />,
    description: "Direct contact for disaster support"
  }
];

const EmergencyContact = () => {
  const handleCall = (number) => {
    window.open(`tel:${number}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col items-center py-12">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-6">Emergency Contacts</h1>
        <p className="text-center text-gray-600 mb-10">
          In case of any emergency, please use the numbers below. Stay calm and provide clear information.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {emergencyContacts.map((contact, idx) => (
            <div key={idx} className="flex items-center bg-blue-50 rounded-xl p-4 shadow hover:shadow-lg transition">
              <div className="text-3xl mr-4 p-3 rounded-full" style={{backgroundColor: contact.icon.props.className.includes('text-blue') ? '#DBEAFE' : contact.icon.props.className.includes('text-indigo') ? '#E0E7FF' : contact.icon.props.className.includes('text-green') ? '#D1FAE5' : contact.icon.props.className.includes('text-red') ? '#FEE2E2' : contact.icon.props.className.includes('text-pink') ? '#FCE7F3' : contact.icon.props.className.includes('text-purple') ? '#EDE9FE' : contact.icon.props.className.includes('text-orange') ? '#FFEDD5' : '#CCFBF1'}}>{contact.icon}</div>
              <div className="flex-grow">
                <div className="text-lg font-semibold text-blue-900">{contact.name}</div>
                <div className="text-2xl font-bold text-blue-700">{contact.number}</div>
                <div className="text-sm text-gray-500">{contact.description}</div>
              </div>
              <button 
                onClick={() => handleCall(contact.number)}
                className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-100 transition"
                aria-label={`Call ${contact.name}`}
              >
                <FaPhoneAlt className="text-xl" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmergencyContact;
