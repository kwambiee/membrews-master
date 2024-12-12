import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./components/data-table";
import MembershipChart from "./components/chart";
import StatisticCard from "./components/statistics";
import ActivityLogs from "./components/activity-logs";
import { useAuth } from "@/context"
import { useNavigate } from "react-router";
import {getRoles, getMembers, getActivityLogs} from "@/utils/api";
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button";



const columns: ColumnDef<{
  id: string;
  name: string;
  phone: string;
  role: string;
  profilePicture: string;
  dateOfBirth: string;
}>[] = [
  {
    accessorKey: "name",
    // make header sortable
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "phone",
    header:({column}) =>{
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Phone
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "profilePicture",
    header: "Profile Picture",
    cell: ({ row }) => (
      <img
        src={row.original.profilePicture}
        alt="Profile Picture"
        width={50}
        height={50}
        className="rounded-full"
      />
    ),
  },
  {
    accessorKey: "dateOfBirth",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date of Birth
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }
  },
];

type roles = {
  id: string;
  roleName: string;
}

type userDataType = {
  id: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  dateOfBirth: string;
  phone: string;
  userId: string;
  roleId: string;
  createdAt: string;
  updatedAt: string; 
};

type activityLogType = {
  id: string;
  action: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  userId: string;
}

type memberChart = {
  admins: number;
  members: number;
  users: number;
  date: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [memberData, setMemberData] = useState<userDataType[]>([]);
  const [activityLogs, setActivityLogs] = useState<activityLogType[]>([]);
  const [userRoles, setUserRoles] = useState<roles[]>([]);
  const [adminId, setAdminId] = useState<string | null>(null);
  const [memberId, setMemberId] = useState<string | null>(null);
  const [totalAdmins, setTotalAdmins] = useState<number>(0);
  const [totalMembers, setTotalMembers] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);

  useEffect(() => {
    getAllUsers();
    getAllLogs();
    getUserRoles();
    // getStatitics();
  }, []);


  // get user roles from api//
  const getUserRoles = async () => {
    const roles = await getRoles();
    setUserRoles(roles);
    if (userRoles.length > 0) {
      setAdminId(roles.find((role: roles) => role.roleName === "Admin")?.id || null);
      setMemberId(roles.find((role: roles) => role.roleName === "Member")?.id || null);
  };
  }

   const getAllUsers = async () => {
  try {
    const response = await getMembers();
    const members = response.data;
    setMemberData(members);
    if (members.length > 0) {
      // console.log(members, "members")
      const totalAdmins = members.filter((member: userDataType) => member.roleId === adminId).length;
      // console.log(totalAdmins, "-----total admin");
      setTotalAdmins(totalAdmins);
      
      setTotalMembers(members.filter((member: userDataType) => member.roleId === memberId).length);
      setTotalUsers(members.length);
    }
  } catch (error) {
    console.error("Error fetching members:", error);
  }
};



  // -----get activity logs from api//

  const getAllLogs = async () => {
    const response = await getActivityLogs();
    setActivityLogs(response.data);
  }

  // const getStatitics = () => {
  //   const totalAdmins = memberData.filter((member) => member.roleId === adminId).length;
  //   const totalMembers = memberData.filter((member) => member.roleId === memberId).length;
  //   const totalUsers = memberData.length;
  //   return { totalAdmins, totalMembers, totalUsers };
  // }

  
  // const find total admin, members and users at different dates of creation
  const memberChartData: memberChart[] = [];
  const memberDataByDate = memberData.reduce((acc, member) => {
    const date = member.createdAt
    if (!acc[date]) {
      acc[date] = {
        admins: 0,
        members: 0,
        users: totalUsers,
        date,
      };
    }
    if (member.roleId === adminId) {
      acc[date].admins += 1;
    } else if (member.roleId === memberId) {
      acc[date].members += 1;
    }
    return acc;
  }, {} as Record<string, memberChart>);
  memberChartData.push(...Object.values(memberDataByDate));

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;

  return (
    <div className="flex flex-col gap-8 p-12">
      <StatisticCard adminCount={totalAdmins} memberCount={totalMembers} totalCount={totalUsers} />
      <div className="flex gap-x-4">
        <div className="w-3/4">
          <MembershipChart chartData={memberChartData} />
        </div>
        <div className="w-1/4">
          <ActivityLogs logs={activityLogs} members={memberData} />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={memberData.map((member) => ({
          id: member.id,
          name: `${member.firstName} ${member.lastName}`,
          phone: member.phone,
          role: userRoles.find((role) => role.id === member.roleId)?.roleName || "",
          profilePicture: member.profilePicture,
          dateOfBirth: member.dateOfBirth,
        }))}
      />
    </div>
  );
};

export default Dashboard;
