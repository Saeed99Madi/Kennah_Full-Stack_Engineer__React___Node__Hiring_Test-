import CustomPopover, { usePopover } from "@/components/custom-popover";
import Iconify from "@/components/iconify";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  compleatTask,
  deleteTask,
  handleOpen,
  setEditMode,
  setEditTask,
  unCompleatTask,
} from "@/redux/slices/tasksSlice";
import { ITasks } from "@/types/tasks";
import { fDate } from "@/utils/format-time";
import { LoadingButton } from "@mui/lab";
import { Box, Checkbox, MenuItem, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export const TaskItem = ({ task }: { task: ITasks }) => {
  const popover = usePopover();
  const dispatch = useAppDispatch();
  const CLoading = useAppSelector((state) => state.TaskSlice.CLoading);

  const router = useRouter();
  const isToday = (date: Date) => {
    const today = new Date();
    return fDate(today, "dd MMM") === fDate(date, "dd MMM");
  };

  const handleCompleted = async () => {
    try {
      if (task.status === "completed") {
        await dispatch(unCompleatTask(task._id as string));
      } else {
        await dispatch(compleatTask(task._id as string));
      }
    } catch (error) {
      console.error("Error marking task as completed:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteTask(task._id as string));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        width: "100%",
        p: 2,
        border: "1px solid #ccc",
        borderRadius: 2,
        m: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          gap: 0,
        }}
      >
        <LoadingButton
          sx={{ pt: 1.5, m: 0, width: "0px", height: "0px" }}
          loading={CLoading}
        >
          {!CLoading && (
            <Checkbox
              onChange={handleCompleted}
              sx={{ p: 0.5 }}
              color="success"
              checked={task.status === "completed"}
            />
          )}
        </LoadingButton>
        <Box>
          <Typography>{task.title}</Typography>
          <Typography sx={{ fontSize: "14px" }}>{task.description}</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 1,
        }}
      >
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            justifyContent: "center",
            color: "primary.main",
            fontSize: "12px",
          }}
        >
          <Iconify icon="formkit:date" width="12" height="12" />
          {isToday(task.dueDate) ? "Today" : fDate(task.dueDate, "dd MMM")}
        </Typography>
        <Iconify
          icon="solar:menu-dots-bold"
          onClick={popover.onOpen}
          style={{ cursor: "pointer" }}
        />

        <CustomPopover
          open={popover.open}
          onClose={popover.onClose}
          arrow="right-top"
          sx={{ width: 140 }}
        >
          <MenuItem
            onClick={() => {
              popover.onClose();
              handleDelete();
            }}
            sx={{ color: "error.main" }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>

          <MenuItem
            onClick={async () => {
              await dispatch(setEditTask(task));
              dispatch(setEditMode(true));
              dispatch(handleOpen());
              popover.onClose();
            }}
          >
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem
            onClick={async () => {
              router.push(`/tasks/view/${task._id}`);
            }}
          >
            <Iconify icon="solar:eye-bold" />
            view
          </MenuItem>
        </CustomPopover>
      </Box>
    </Box>
  );
};
