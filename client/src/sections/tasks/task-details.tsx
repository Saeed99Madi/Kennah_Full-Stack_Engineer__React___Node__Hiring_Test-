import Iconify from "@/components/iconify";
import { ITasks } from "@/types/tasks";
import { fDate } from "@/utils/format-time";
import { Box, TextField, Typography } from "@mui/material";

const TasksDetails = ({ currentTask }: { currentTask: ITasks }) => {
  const isToday = (date: Date) => {
    const today = new Date();
    return fDate(today, "dd MMM") === fDate(date, "dd MMM");
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h4">{currentTask.title} Details</Typography>

      <TextField
        fullWidth
        label="Title"
        name="title"
        value={currentTask.title}
        disabled
      />
      <TextField
        label="Description"
        fullWidth
        disabled
        multiline
        value={currentTask.description}
        rows={4}
        sx={{
          mb: 2,
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            justifyContent: "center",
            color: "primary.main",
            fontSize: "16px",
            backgroundColor: "primary.lighter",
            p: 2,
            borderRadius: 2,
          }}
        >
          <Iconify icon="formkit:date" width="12" height="12" />
          {isToday(currentTask.dueDate)
            ? "Today"
            : fDate(currentTask.dueDate, "dd MMM")}
        </Typography>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            justifyContent: "center",
            color: "primary.main",
            fontSize: "16px",
            backgroundColor:
              currentTask.status === "Completed"
                ? "success.lighter"
                : "primary.lighter",
            p: 2,
            borderRadius: 2,
          }}
        >
          <Iconify icon="formkit:date" width="12" height="12" />
          {currentTask.status}
        </Typography>
      </Box>
    </Box>
  );
};

export default TasksDetails;
