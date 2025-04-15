import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Grid, FormControl } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
// Validation schema
const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  dueDate: yup.date().required('Due date is required').nullable(),
});

const TasksNewEditForm = ({ currentTask}: {
  currentTask: {
    title: string;
    description: string;
    dueDate: Date | null;
  } | null;
}) => {

  const defaultValues = {
    title: currentTask?.title || '',
    description: currentTask?.description || '',
    dueDate: currentTask?.dueDate || null,
  }
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      // Handle form submission logic here
      console.log('Form Data:', data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  });

  return (
    <FormControl component="form" onSubmit={onSubmit} noValidate>
      <Grid container spacing={2}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Title"
                fullWidth
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />
                    <DatePicker
            label="Due Date"
            value={defaultValues.dueDate}
            onChange={(date) => {
              setValue('dueDate', date);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={!!errors.dueDate}
                helperText={errors.dueDate?.message}
              />
            )}
          />
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
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
      </Grid>
    </FormControl>
  );
};

export default TasksNewEditForm;