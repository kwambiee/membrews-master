"use client"

import { useState, useEffect } from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Car } from "lucide-react"
import { ref } from "firebase/storage"

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
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)
    const [logData, setLogData] = useState<logDataType[]>([])

    const refinedLogData: logDataType[] = []
    const updateLogData = logs.map((log: activityType) => {
        const member = members.find((member: userDataType) => member.userId === log.userId)
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
    console.log(refinedLogData)
    

    return (
        < Card>
            <CardHeader>
                <CardTitle className="h-4 pt-4 text-start">Activity Logs</CardTitle>
                <CardDescription className="h-12"></CardDescription>
            </CardHeader>
            <CardContent className="h-64 overflow-y-auto">
              {loading && <p>Loading...</p>}
              {error && <p>Error: {error.message}</p>}
      
        
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