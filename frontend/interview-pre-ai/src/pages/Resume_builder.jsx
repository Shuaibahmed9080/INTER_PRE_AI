import React, { useState, useRef } from 'react';
import { Download, Plus, Trash2, User, Mail, Phone, MapPin, Briefcase, GraduationCap, Code, FolderOpen, Award, Heart } from 'lucide-react';
import Navbar from '../components/layouts/Navbar';

const ResumeBuilder = () => {
  const [template, setTemplate] = useState('modern');
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  
  const resumeRef = useRef();

  const addEducation = () => {
    setEducation([...education, { school: '', degree: '', year: '', gpa: '' }]);
  };

  const updateEducation = (index, field, value) => {
    const updated = [...education];
    updated[index][field] = value;
    setEducation(updated);
  };

  const removeEducation = (index) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const addExperience = () => {
    setExperience([...experience, { company: '', position: '', duration: '', description: '' }]);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...experience];
    updated[index][field] = value;
    setExperience(updated);
  };

  const removeExperience = (index) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  const addSkill = () => {
    setSkills([...skills, '']);
  };

  const updateSkill = (index, value) => {
    const updated = [...skills];
    updated[index] = value;
    setSkills(updated);
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const addProject = () => {
    setProjects([...projects, { name: '', description: '', technologies: '' }]);
  };

  const updateProject = (index, field, value) => {
    const updated = [...projects];
    updated[index][field] = value;
    setProjects(updated);
  };

  const removeProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const addCertification = () => {
    setCertifications([...certifications, { name: '', issuer: '', date: '' }]);
  };

  const updateCertification = (index, field, value) => {
    const updated = [...certifications];
    updated[index][field] = value;
    setCertifications(updated);
  };

  const removeCertification = (index) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  const addHobby = () => {
    setHobbies([...hobbies, '']);
  };

  const updateHobby = (index, value) => {
    const updated = [...hobbies];
    updated[index] = value;
    setHobbies(updated);
  };

  const removeHobby = (index) => {
    setHobbies(hobbies.filter((_, i) => i !== index));
  };

  const downloadPDF = () => {
    window.print();
  };

  const getTemplateStyles = () => {
    switch(template) {
      case 'classic':
        return {
          container: 'bg-white text-gray-900 font-serif',
          header: 'border-b-4 border-gray-800 pb-4 mb-6',
          section: 'mb-6 border-b border-gray-300 pb-4',
          title: 'text-2xl font-bold text-gray-800 mb-2',
          subtitle: 'text-lg font-semibold text-gray-700 mb-3'
        };
      case 'minimal':
        return {
          container: 'bg-gray-50 text-gray-800',
          header: 'pb-6 mb-6',
          section: 'mb-8',
          title: 'text-xl font-light text-gray-900 mb-2 tracking-wide',
          subtitle: 'text-base font-medium text-gray-600 mb-3 uppercase tracking-widest text-sm'
        };
      default: // modern
        return {
          container: 'bg-gradient-to-br from-slate-50 to-blue-50 text-gray-800',
          header: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg mb-6 shadow-lg',
          section: 'mb-6 bg-white p-4 rounded-lg shadow-sm',
          title: 'text-3xl font-bold mb-2',
          subtitle: 'text-lg font-semibold text-blue-600 mb-3 flex items-center gap-2'
        };
    }
  };

  const styles = getTemplateStyles();

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">Resume Builder</h1>
            <p className="text-blue-100">Create your professional resume in minutes</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Input Section */}
            <div className="space-y-6 overflow-y-auto max-h-screen pb-20">
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setTemplate('modern')}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
                    template === 'modern' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Modern
                </button>
                <button
                  onClick={() => setTemplate('classic')}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
                    template === 'classic' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Classic
                </button>
                <button
                  onClick={() => setTemplate('minimal')}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
                    template === 'minimal' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Minimal
                </button>
              </div>

              {/* Personal Info */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Personal Information
                </h2>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={personalInfo.name}
                    onChange={(e) => setPersonalInfo({...personalInfo, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    value={personalInfo.address}
                    onChange={(e) => setPersonalInfo({...personalInfo, address: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Education */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-purple-600" />
                    Education
                  </h2>
                  <button onClick={addEducation} className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                {education.map((edu, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg mb-3 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-semibold text-gray-600">Entry {index + 1}</span>
                      <button onClick={() => removeEducation(index)} className="text-red-500 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="School/University"
                      value={edu.school}
                      onChange={(e) => updateEducation(index, 'school', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded mb-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded mb-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Year"
                        value={edu.year}
                        onChange={(e) => updateEducation(index, 'year', e.target.value)}
                        className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="GPA (optional)"
                        value={edu.gpa}
                        onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                        className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Experience */}
              <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-green-600" />
                    Experience
                  </h2>
                  <button onClick={addExperience} className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                {experience.map((exp, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg mb-3 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-semibold text-gray-600">Entry {index + 1}</span>
                      <button onClick={() => removeExperience(index)} className="text-red-500 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) => updateExperience(index, 'company', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded mb-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Position"
                      value={exp.position}
                      onChange={(e) => updateExperience(index, 'position', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded mb-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Duration (e.g., Jan 2020 - Dec 2022)"
                      value={exp.duration}
                      onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded mb-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <textarea
                      placeholder="Description"
                      value={exp.description}
                      onChange={(e) => updateExperience(index, 'description', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      rows="3"
                    />
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Code className="w-5 h-5 text-orange-600" />
                    Skills
                  </h2>
                  <button onClick={addSkill} className="bg-orange-600 text-white p-2 rounded-lg hover:bg-orange-700 transition">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                {skills.map((skill, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Skill name"
                      value={skill}
                      onChange={(e) => updateSkill(index, e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <button onClick={() => removeSkill(index)} className="text-red-500 hover:text-red-700 p-2">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Projects */}
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-xl shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <FolderOpen className="w-5 h-5 text-cyan-600" />
                    Projects
                  </h2>
                  <button onClick={addProject} className="bg-cyan-600 text-white p-2 rounded-lg hover:bg-cyan-700 transition">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                {projects.map((project, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg mb-3 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-semibold text-gray-600">Project {index + 1}</span>
                      <button onClick={() => removeProject(index)} className="text-red-500 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Project Name"
                      value={project.name}
                      onChange={(e) => updateProject(index, 'name', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded mb-2 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                    <textarea
                      placeholder="Description"
                      value={project.description}
                      onChange={(e) => updateProject(index, 'description', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded mb-2 resize-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      rows="2"
                    />
                    <input
                      type="text"
                      placeholder="Technologies used"
                      value={project.technologies}
                      onChange={(e) => updateProject(index, 'technologies', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>
                ))}
              </div>

              {/* Certifications */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-600" />
                    Certifications
                  </h2>
                  <button onClick={addCertification} className="bg-yellow-600 text-white p-2 rounded-lg hover:bg-yellow-700 transition">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                {certifications.map((cert, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg mb-3 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-semibold text-gray-600">Certificate {index + 1}</span>
                      <button onClick={() => removeCertification(index)} className="text-red-500 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Certification Name"
                      value={cert.name}
                      onChange={(e) => updateCertification(index, 'name', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded mb-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Issuing Organization"
                      value={cert.issuer}
                      onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded mb-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Date (e.g., Jan 2024)"
                      value={cert.date}
                      onChange={(e) => updateCertification(index, 'date', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>
                ))}
              </div>

              {/* Hobbies */}
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-xl shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-pink-600" />
                    Hobbies & Interests
                  </h2>
                  <button onClick={addHobby} className="bg-pink-600 text-white p-2 rounded-lg hover:bg-pink-700 transition">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                {hobbies.map((hobby, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Hobby or interest"
                      value={hobby}
                      onChange={(e) => updateHobby(index, e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                    <button onClick={() => removeHobby(index)} className="text-red-500 hover:text-red-700 p-2">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Preview Section */}
            <div className="lg:sticky lg:top-6 h-fit">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Live Preview</h2>
                <button
                  onClick={downloadPDF}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition flex items-center gap-2 shadow-lg"
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>
              </div>
              
              <div ref={resumeRef} className={`${styles.container} p-8 rounded-xl shadow-xl min-h-[800px]`}>
                {/* Header */}
                <div className={styles.header}>
                  <h1 className={styles.title}>{personalInfo.name || 'Your Name'}</h1>
                  <div className={`text-sm ${template === 'modern' ? 'text-blue-100' : 'text-gray-600'} space-y-1`}>
                    {personalInfo.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {personalInfo.email}
                      </div>
                    )}
                    {personalInfo.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {personalInfo.phone}
                      </div>
                    )}
                    {personalInfo.address && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {personalInfo.address}
                      </div>
                    )}
                  </div>
                </div>

                {/* Education */}
                {education.length > 0 && (
                  <div className={styles.section}>
                    <h2 className={styles.subtitle}>
                      {template === 'modern' && <GraduationCap className="w-5 h-5" />}
                      Education
                    </h2>
                    {education.map((edu, index) => (
                      <div key={index} className="mb-4 last:mb-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-800">{edu.school}</h3>
                            <p className="text-gray-700">{edu.degree}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-600 text-sm">{edu.year}</p>
                            {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                  <div className={styles.section}>
                    <h2 className={styles.subtitle}>
                      {template === 'modern' && <Briefcase className="w-5 h-5" />}
                      Experience
                    </h2>
                    {experience.map((exp, index) => (
                      <div key={index} className="mb-4 last:mb-0">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                            <p className="text-gray-700">{exp.company}</p>
                          </div>
                          <p className="text-gray-600 text-sm">{exp.duration}</p>
                        </div>
                        <p className="text-gray-600 text-sm mt-2">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Skills */}
                {skills.length > 0 && skills.some(s => s) && (
                  <div className={styles.section}>
                    <h2 className={styles.subtitle}>
                      {template === 'modern' && <Code className="w-5 h-5" />}
                      Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {skills.filter(s => s).map((skill, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-full text-sm ${
                            template === 'modern'
                              ? 'bg-blue-100 text-blue-800'
                              : template === 'classic'
                              ? 'bg-gray-200 text-gray-800'
                              : 'bg-gray-100 text-gray-700 border border-gray-300'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {projects.length > 0 && (
                  <div className={styles.section}>
                    <h2 className={styles.subtitle}>
                      {template === 'modern' && <FolderOpen className="w-5 h-5" />}
                      Projects
                    </h2>
                    {projects.map((project, index) => (
                      <div key={index} className="mb-4 last:mb-0">
                        <h3 className="font-semibold text-gray-800">{project.name}</h3>
                        <p className="text-gray-600 text-sm mt-1">{project.description}</p>
                        {project.technologies && (
                          <p className="text-gray-500 text-xs mt-1">
                            <span className="font-semibold">Technologies:</span> {project.technologies}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .max-w-7xl > .bg-white > div:last-child > div:last-child,
          .max-w-7xl > .bg-white > div:last-child > div:last-child * {
            visibility: visible;
          }
          .max-w-7xl > .bg-white > div:last-child > div:last-child {
            position: absolute;
            left: 0;
            top: 0;
          }
          button {
            display: none !important;
          }
        }
      `}</style>
    </div>
    </>
  );
};

export default ResumeBuilder;