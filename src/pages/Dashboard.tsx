import { useEffect, useState, useMemo } from "react";
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
  const  [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState<number>(0);

  console.log(loading, "loading")

  useEffect(() => {
    getAllUsers();
    getAllLogs();
    getUserRoles();
  }, []);


  // get user roles from api//
  const getUserRoles = async () => {
  try {
    const roles = await getRoles();
    setUserRoles(roles);
    const admin: roles | undefined = roles.find((role: roles) => role.roleName === "Admin");
    const member: roles | undefined = roles.find((role: roles) => role.roleName === "Member");
    setAdminId(admin?.id || null);
    setMemberId(member?.id || null);
  } catch (error) {
    console.log(error);
  }
};

  

   const getAllUsers = async () => {
  try {
    const response = await getMembers();
    const members = response.data;
    setMemberData(members);

    // Calculate totals here  calculateTotals(members);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};


  // -----get activity logs from api//

  const getAllLogs = async () => {
    const response = await getActivityLogs();
    console.log(response.data, "response")
    setActivityLogs(response.data);
  }

  
const memberChartData: memberChart[] = useMemo(() => {
  let adminsCount = 0;
  let membersCount = 0;
  let usersCount = 0;

  const dataByDate = memberData.reduce((acc, member) => {
    const date = new Date(member.createdAt).toISOString().split('T')[0]; // Format the date to YYYY-MM-DD
    if (!acc[date]) {
      acc[date] = {
        admins: 0,
        members: 0,
        users: 0,
        date,
      };
    }
    if (member.roleId === adminId) {
      acc[date].admins += 1;
      adminsCount++;
    } else if (member.roleId === memberId) {
      acc[date].members += 1;
      membersCount++;
    }
    acc[date].users += 1;
    usersCount++;
    return acc;
  }, {} as Record<string, memberChart>);

  setTotalAdmins(adminsCount);
  setTotalMembers(membersCount);
  setTotalUsers(usersCount);

  return Object.values(dataByDate);
}, [memberData, adminId, memberId]);




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
          dateOfBirth: new Date(member.dateOfBirth).toISOString().split('T')[0],
        }))}
      />
    </div>
  );
};

export default Dashboard;

