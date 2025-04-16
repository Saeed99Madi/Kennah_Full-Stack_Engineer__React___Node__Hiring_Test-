"use client";

import { Container } from "@mui/material";
import { useSettingsContext } from "src/components/settings";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
import { paths } from "src/routes/paths";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { SplashScreen } from "@/components/loading-screen";
import TasksDetails from "../task-details";

export default function TaskView() {
  const { currentTask, loading } = useAppSelector((task) => task.TaskSlice);
  const settings = useSettingsContext();
  const pathname = usePathname();
  if (loading) return <SplashScreen />;
  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <CustomBreadcrumbs
        heading={
          pathname.includes("in-box") ? "InBox's Tasks" : "ToDay's Tasks"
        }
        links={[
          { name: "Tasks", href: paths.app.root },
          { name: "Details", href: paths.app.tasks.view },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      {currentTask && <TasksDetails currentTask={currentTask} />}
    </Container>
  );
}
