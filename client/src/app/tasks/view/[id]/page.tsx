"use client";

import { CreateTaskDialog } from "@/components/dialog/create-task-dialog";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchTaskById } from "@/redux/slices/tasksSlice";
import { TaskView } from "@/sections/tasks/view";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function ServiceCreatePage() {
  const despatch = useAppDispatch();
  const refetch = useAppSelector((slice) => slice.TaskSlice.refetch);
  const { id } = useParams();

  useEffect(() => {
    despatch(fetchTaskById(id as string));
  }, [refetch]);
  return (
    <>
      <TaskView />
      <CreateTaskDialog />
    </>
  );
}
