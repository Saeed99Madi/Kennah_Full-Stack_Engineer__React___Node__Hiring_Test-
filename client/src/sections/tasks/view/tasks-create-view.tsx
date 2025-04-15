'use client';

import { Container, Typography } from '@mui/material';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import TaskNewEditForm from '../tasks-new-edit-form';

export default function TaskCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create New Task"
        links={[
          { name: 'Dashboard', href: paths.app.root },
          { name: 'Tasks', href: paths.app.tasks.create },
          { name: 'New Service' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <TaskNewEditForm />
    </Container>
  );
} 