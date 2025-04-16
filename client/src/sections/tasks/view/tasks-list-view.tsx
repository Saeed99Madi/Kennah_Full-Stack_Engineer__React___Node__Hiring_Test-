"use client";

import { Container } from "@mui/material";
import { useSettingsContext } from "src/components/settings";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
import { paths } from "src/routes/paths";
import TasksList from "../tasks-list";
import { usePathname } from "next/navigation";

export default function TaskListView() {
  const settings = useSettingsContext();
  const pathname = usePathname();

  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <CustomBreadcrumbs
        heading={
          pathname.includes("in-box") ? "InBox's Tasks" : "ToDay's Tasks"
        }
        links={[{ name: "Tasks", href: paths.app.root }]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <TasksList />
    </Container>
  );
}
