import MarkAttendance from "../components/MarkAttendance";
import SubmitLeave from "../components/SubmitLeave";

const AttendancePage = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 p-6">
      <MarkAttendance />
      <SubmitLeave />
    </div>
  );
};

export default AttendancePage;
