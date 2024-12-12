"use client"


import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

type activityType = {
  id: string;
  action: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
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

type logDataType = {
  firstName: string | undefined;
  lastName: string | undefined;
  profilePicture: string | undefined;
  action: string;
  description: string;
}



interface ActivityLogsProps {
  logs: activityType[];
  members: userDataType[];
}

const ActivityLogs = ({ logs, members }: ActivityLogsProps) => {
    

    const refinedLogData: logDataType[] = []
    const updateLogData = logs.map((log: activityType) => {
      console.log(members, "members")
        const member = members.find((member: userDataType) => member?.userId === log.userId)
        console.log(member, "member")
        return {
          firstName: member?.firstName,
          lastName: member?.lastName,
          profilePicture: member?.profilePicture,
          action: log.action,
          description: log.description
        }
      }
    )

    refinedLogData.push(...updateLogData)
    

    return (
        < Card>
            <CardHeader>
                <CardTitle className="h-4 pt-4 text-start">Activity Logs</CardTitle>
                <CardDescription className="h-12"></CardDescription>
            </CardHeader>
            <CardContent className="h-64 overflow-y-auto">
              
      
        
               {refinedLogData.map((log, index) => (
        <div key={index} className="my-4">
            <div className="flex items-center gap-2 pb-4">
                <img
                className="h-8 w-8 rounded-full"
                src={log.profilePicture}
                alt={`${log.firstName} ${log.lastName}`}
                />
                <div>
                <p className="font-semibold">{`${log.firstName} ${log.lastName}`}</p>
                <p className="text-sm text-gray-500">{log.description}</p>
                </div>
            </div>
          <div className="bg-gray-300 h-[1.3px] w-full mx-auto"></div>
        </div>
        
      ))}

    
      </CardContent>
        </Card>
        
    )
};

export default ActivityLogs