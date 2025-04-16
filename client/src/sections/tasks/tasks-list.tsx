import { SplashScreen } from "@/components/loading-screen";
import { useAppSelector } from "@/redux/hooks";
import { Alert, Stack, Typography } from "@mui/material";
import { TaskItem } from "./task-item";
const TasksList = () => {
  const { loader, tasks } = useAppSelector((slice) => slice.TaskSlice);

  if (loader) return <SplashScreen />;
  return (
    <Stack>
      {Array.isArray(tasks) && tasks.length > 0 ? (
        [
          tasks.length > 0 && (
            <Typography
              variant="h5"
              sx={{
                color: "primary.main",
              }}
            >
              {`${tasks.length} Tasks to Do`}
            </Typography>
          ),
          tasks.map((task) => <TaskItem key={task._id} task={task} />),
        ]
      ) : (
        <Alert severity="info" sx={{ width: "100%" }}>
          No tasks found
        </Alert>
      )}
    </Stack>
  );
};

export default TasksList;
