import { useMemo } from 'react';
// routes
import { paths } from '@/routes/paths';
// components
import { Icon } from '@iconify/react';



// ----------------------------------------------------------------------

export function useNavData() {
  const data = useMemo(
    () => [
      // OVERVIEW
      {
        subheader: 'MANAGEMENT',
        items: [
          { title: 'To Day', path: paths.app.root, icon: <Icon icon="material-symbols:today" width="24" height="24" /> },
          { title: 'In Box', path: paths.app.inBox, icon: <Icon icon="solar:inbox-bold" width="24" height="24" /> },
        ],
      },
    ],
    []
  );

  return data;
}
