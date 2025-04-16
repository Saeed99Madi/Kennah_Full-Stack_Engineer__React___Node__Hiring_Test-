/* eslint-disable import/no-unresolved */
import * as React from "react";
import * as yup from "yup";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  createTask,
  editTask,
  handleClear,
  handleClose,
  Refetch,
  setEditMode,
} from "@/redux/slices/tasksSlice";
import { Box, FormControl, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import "react-datepicker/dist/react-datepicker.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";

export function CreateTaskDialog() {
  const { open, loading, editMode } = useAppSelector(
    (state) => state.TaskSlice,
  );
  const currentTask = useAppSelector((task) => task.TaskSlice.currentTask);
  const dispatch = useAppDispatch();
  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    dueDate: yup.date().required("Due date is required"),
  });

  const defaultValues = {
    title: currentTask?.title || "",
    description: currentTask?.description || "",
    dueDate:
      (currentTask?.dueDate && new Date(currentTask?.dueDate)) || new Date(),
  };
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (editMode && currentTask) {
        await dispatch(editTask({ ...data, _id: currentTask._id }));
        dispatch(setEditMode(false));
      } else {
        await dispatch(createTask(data));
      }
      dispatch(handleClear());
      reset();
      dispatch(Refetch());
      dispatch(handleClose());
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  });
  const HandleClose = () => {
    dispatch(handleClear());
    reset();
    dispatch(handleClose());
    dispatch(setEditMode(false));
  };

  React.useEffect(() => {
    reset(defaultValues);
  }, [currentTask]);

  return (
    <Dialog
      open={open}
      onClose={HandleClose}
      aria-labelledby="tasks-dialog-title"
      aria-describedby="tasks-dialog-description"
      maxWidth="md"
      fullWidth
    >
      <DialogTitle id="tasks-dialog-title">Create New Task</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          p: 3,
        }}
      >
        <FormControl fullWidth component="form" onSubmit={onSubmit} noValidate>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              mb: 2,
              pt: 2,
            }}
          >
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  {...field}
                  label="Title"
                  name="title"
                  value={values.title}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  sx={{ width: "50%" }}
                />
              )}
            />
            <DatePicker
              label="Due Date of Task"
              name="dueDate"
              onChange={(newValue) =>
                setValue("dueDate", new Date(newValue as any))
              }
              minDate={new Date()}
              value={values.dueDate}
              sx={{ width: "50%" }}
              slotProps={{
                textField: {
                  error: !!errors.dueDate,
                  helperText: errors.dueDate?.message,
                },
              }}
            />
          </Box>

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                fullWidth
                multiline
                rows={4}
                sx={{
                  mb: 2,
                }}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />

          <LoadingButton
            loading={loading}
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </LoadingButton>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={HandleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
