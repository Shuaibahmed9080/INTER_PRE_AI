import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { CARD_BG } from "../../utils/data";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import SummaryCard from "../../components/Cards/SummaryCard";
import moment from "moment";
import CreateSessionForm from "./CreateSessionFrom";
import Modal from "../../components/Modal";
import DeleteAlertContent from "../../components/DeleteAlertContent";

const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  // Fetch sessions
  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      console.log("Full API Response:", response.data); // Debug log
      // setSessions(response.data.data || []); // 👈 FIX applied here
      setSessions(response.data); // 👈 FIX applied here
    } catch (error) {
      console.error("Error fetching session data:", error);
      toast.error("Failed to fetch sessions");
    }
  };

  const deleteSession = async (sessionData) => { 
  try {
    await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    toast.success("Session Deleted Successfully");
    setOpenDeleteAlert({
      open: false,
      data: null,
    });
    fetchAllSessions();

  } catch (error) {
    console.log("Error deleting Session data:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Failed to delete session");
  }
};

  // To be implemented later
  // console.log("Delete session:", sessionData);

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashboardLayout>
      <div className="relative p-6">
        {/* Cards wrapper */}
        {console.log("🔥 Sessions from API:", sessions)}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions?.map((data, index) => (
            <SummaryCard
              key={data?._id}
              colors={CARD_BG[index % CARD_BG.length]}
              role={data?.role || ""}
              topicToFocus={data?.topicToFocus || ""}
              experience={data?.experience || "-"}
              questions={data?.questions?.length || "-"}
              description={data?.description || ""}
              lastUpdated={
                data?.updatedAt
                  ? moment(data.updatedAt).format("DD MMM, YYYY")
                  : ""
              }
              onSelect={() => navigate(`/interview-prep/${data?._id}`)}
              onDelete={() => setOpenDeleteAlert({ open: true, data })}
            />
          ))}
        </div>

        {/* Add button bottom right */}
        <button
          className="fixed bottom-6 right-6 bg-[#FF9324] hover:bg-[#e67e22] 
          text-white px-5 py-3 rounded-full shadow-lg 
          flex items-center gap-2 transition duration-300"
          onClick={() => setOpenCreateModal(true)}
        >
          <Plus className="w-5 h-5" />
          Add New
        </button>
      </div>


      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideHeader
      >
        <CreateSessionForm onClose={() => setOpenCreateModal(false)} />
      </Modal>

      <Modal
        isOpen={openDeleteAlert.open}
        onClose={() => setOpenDeleteAlert({ open: false, data: null })}
        title="Delete Alert"
      >
        <div className="w-[30vw]">
          <DeleteAlertContent
            content="Are you sure you want to delete this session?"
            onDelete={() => deleteSession(openDeleteAlert.data)}
          />
        </div>
      </Modal>

    </DashboardLayout>
  );
};
export default Dashboard;


