'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';
import { isNavItemActive } from '@/lib/is-nav-item-active';
import { navItems } from './config';
import { navIcons } from './nav-icons';

export function SideNav(): React.JSX.Element {
  const pathname = usePathname();

  return (
    <Box
      sx={{
        '--SideNav-color': 'var(--mui-palette-common-white)',
        '--NavItem-color': 'rgba(255, 255, 255, 0.9)',
        '--NavItem-hover-background': 'rgba(255, 255, 255, 0.1)',
        '--NavItem-active-background': 'rgba(255, 255, 255, 0.2)',
        '--NavItem-active-color': '#fff',
        '--NavItem-disabled-color': 'rgba(255, 255, 255, 0.4)',
        '--NavItem-icon-color': 'rgba(255, 255, 255, 0.85)',
        '--NavItem-icon-active-color': '#fff',
        '--NavItem-icon-disabled-color': 'rgba(255, 255, 255, 0.4)',

        /*
          🌤️ Hai nguồn sáng trắng nhỏ gọn ở góc trên trái & phải.
          → Màu trắng tinh khiết (white) rõ nét hơn.
          → Nền đậm nhất là #2877ED, có nhấn #09A3FB xen kẽ.
        */
        backgroundImage: `
    // /* 1️⃣ White light top-left (nhỏ hơn, thu hẹp vùng sáng) */
    // radial-gradient(circle at 5% 5%, white 0%, rgba(255,255,255,0.9) 15%, transparent 40%),

    // /* 2️⃣ White light top-right (nhỏ hơn, thu hẹp vùng sáng) */
    // radial-gradient(circle at 95% 5%, white 0%, rgba(255,255,255,0.9) 15%, transparent 40%),

    // /* 3️⃣ Accents #09A3FB giúp hiệu ứng sống động hơn */
    // radial-gradient(circle at 30% 35%, rgba(9,163,251,0.55), transparent 22%),
    // radial-gradient(circle at 70% 45%, rgba(9,163,251,0.42), transparent 22%),

    /* 4️⃣ Base gradient (đậm nhất #2877ED) */
    linear-gradient(145deg, #09A3FB 15%, #09A3FB 30%, #2877ED 100%)
  `,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundBlendMode: 'screen',

        color: 'var(--SideNav-color)',
        display: { xs: 'none', lg: 'flex' },
        flexDirection: 'column',
        height: '100%',
        left: 0,
        position: 'fixed',
        overflowY: 'auto',
        scrollbarWidth: 'none',
        top: 0,
        width: 'var(--SideNav-width)',
        zIndex: 'var(--SideNav-zIndex)',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {/* 🔹 Header: Logo + Silen Talk */}
      <Stack spacing={2} sx={{ p: 3, pl: 4, pr: 2 }}>
        <Box
          component={RouterLink}
          href={paths.home}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 1.5,
            textDecoration: 'none',
          }}
        >
          <Box
            component="img"
            // src="/assets/group-R5.svg"
            src="/assets/logo.svg"
            alt="Logo"
            sx={{
              height: 42,
              width: 'auto',
            }}
          />
          {/* <Typography
            sx={{
              fontFamily: `'Open Sans', sans-serif`,
              fontWeight: 600,
              fontSize: '1.7rem',
              // color: '#2877ED',
              color: 'white',
              textDecoration: 'none',
              letterSpacing: 0.4,
            }}
          >
            SilenTalk
          </Typography> */}
        </Box>
      </Stack>
      <Box
        component="nav"
        sx={{
          flex: '1 1 auto',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          p: '12px',
          position: 'relative',
          top: '-1%',
          transform: 'translateY(-1%)',
        }}
      >
        <Stack
          component="ul"
          spacing={1}
          sx={{ listStyle: 'none', m: 0, p: 0, width: '100%' }}
        >
          {renderNavItems({ pathname, items: navItems })}
        </Stack>
      </Box>
    </Box>
  );
}

/* ---------------------- Helper ---------------------- */

function renderNavItems({
  items = [],
  pathname,
}: {
  items?: NavItemConfig[];
  pathname: string;
}): React.JSX.Element {
  const children = items.reduce((acc: React.ReactNode[], curr: NavItemConfig): React.ReactNode[] => {
    const { key, ...item } = curr;
    acc.push(<NavItem key={key} pathname={pathname} {...item} />);
    return acc;
  }, []);

  return <>{children}</>;
}

interface NavItemProps extends Omit<NavItemConfig, 'items'> {
  pathname: string;
}

function NavItem({
  disabled,
  external,
  href,
  icon,
  matcher,
  pathname,
  title,
}: NavItemProps): React.JSX.Element {
  const active = isNavItemActive({ disabled, external, href, matcher, pathname });
  const Icon = icon ? navIcons[icon] : null;

  return (
    <li>
      <Box
        {...(href
          ? {
            component: external ? 'a' : RouterLink,
            href,
            target: external ? '_blank' : undefined,
            rel: external ? 'noreferrer' : undefined,
          }
          : { role: 'button' })}
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          color: 'var(--NavItem-color)',
          cursor: 'pointer',
          display: 'flex',
          flex: '0 0 auto',
          gap: 1,
          p: '6px 16px',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          transition: 'all 0.25s ease',
          ...(disabled && {
            bgcolor: 'var(--NavItem-disabled-background)',
            color: 'var(--NavItem-disabled-color)',
            cursor: 'not-allowed',
          }),
          ...(active && {
            bgcolor: 'var(--NavItem-active-background)',
            color: 'var(--NavItem-active-color)',
          }),
          '&:hover': {
            bgcolor: 'rgba(255,255,255,0.08)',
          },
        }}
      >
        {Icon && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: '0 0 auto',
            }}
          >
            <Icon
              fill={active ? 'var(--NavItem-icon-active-color)' : 'var(--NavItem-icon-color)'}
              fontSize="var(--icon-fontSize-md)"
              weight={active ? 'fill' : undefined}
            />
          </Box>
        )}
        <Typography
          sx={{
            color: 'inherit',
            fontSize: '0.875rem',
            fontWeight: 500,
            lineHeight: '28px',
          }}
        >
          {title}
        </Typography>
      </Box>
    </li>
  );
}


// 'use client';

// import * as React from 'react';
// import RouterLink from 'next/link';
// import { usePathname } from 'next/navigation';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Divider from '@mui/material/Divider';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import { ArrowSquareUpRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowSquareUpRight';
// import { CaretUpDownIcon } from '@phosphor-icons/react/dist/ssr/CaretUpDown';

// import type { NavItemConfig } from '@/types/nav';
// import { paths } from '@/paths';
// import { isNavItemActive } from '@/lib/is-nav-item-active';
// import { Logo } from '@/components/core/logo';

// import { navItems } from './config';
// import { navIcons } from './nav-icons';

// export function SideNav(): React.JSX.Element {
//   const pathname = usePathname();

//   return (
//     <Box
//       sx={{
//         '--SideNav-color': 'var(--mui-palette-common-white)',
//         '--NavItem-color': 'rgba(255, 255, 255, 0.9)',
//         '--NavItem-hover-background': 'rgba(255, 255, 255, 0.1)',
//         '--NavItem-active-background': 'rgba(255, 255, 255, 0.2)',
//         '--NavItem-active-color': '#fff',
//         '--NavItem-disabled-color': 'rgba(255, 255, 255, 0.4)',
//         '--NavItem-icon-color': 'rgba(255, 255, 255, 0.85)',
//         '--NavItem-icon-active-color': '#fff',
//         '--NavItem-icon-disabled-color': 'rgba(255, 255, 255, 0.4)',

//         // 🌈 Hiệu ứng TikTok — sáng ở góc trái trên, đậm dần xuống phải
//         backgroundImage: `
//           radial-gradient(circle at 0% 0%, rgba(255,255,255,0.8), transparent 50%),
//           linear-gradient(145deg, #ffffff 0%, #09a3fb 40%, #2877ED 100%)
//         `,
//         backgroundRepeat: 'no-repeat',
//         backgroundSize: 'cover',
//         backgroundBlendMode: 'screen',

//         color: 'var(--SideNav-color)',
//         display: { xs: 'none', lg: 'flex' },
//         flexDirection: 'column',
//         height: '100%',
//         left: 0,
//         position: 'fixed',
//         overflowY: 'auto',
//         scrollbarWidth: 'none',
//         top: 0,
//         width: 'var(--SideNav-width)',
//         zIndex: 'var(--SideNav-zIndex)',
//         '&::-webkit-scrollbar': { display: 'none' },
//       }}
//     >
//       {/* 🔹 Header: Logo + Tên ứng dụng */}
//       <Stack spacing={2} sx={{ p: 3, pl: 4, pr: 2 }}>
//         <Box
//           component={RouterLink}
//           href={paths.home}
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'flex-start',
//             gap: 1.2,
//           }}
//         >
//           <Box
//             component="img"
//             src="/assets/group-R5.svg"
//             alt="Logo"
//             sx={{
//               height: 48,
//               width: 'auto',
//             }}
//           />
//           <Typography
//             sx={{
//               fontFamily: `'Open Sans', sans-serif`,
//               fontWeight: 600,
//               fontSize: '1.1rem',
//               color: 'rgba(255,255,255,0.95)',
//               letterSpacing: 0.3,
//             }}
//           >
//             Silen Talk
//           </Typography>
//         </Box>


//         {/* <Box
//           sx={{
//             alignItems: 'center',
//             backgroundColor: 'var(--mui-palette-neutral-950)',
//             border: '1px solid var(--mui-palette-neutral-700)',
//             borderRadius: '12px',
//             cursor: 'pointer',
//             display: 'flex',
//             p: '4px 12px',
//           }}
//         >
//           <Box sx={{ flex: '1 1 auto' }}>
//             <Typography color="var(--mui-palette-neutral-400)" variant="body2">
//               Workspace
//             </Typography>
//             <Typography color="inherit" variant="subtitle1">
//               Devias
//             </Typography>
//           </Box>
//           <CaretUpDownIcon />
//         </Box> */}
//       </Stack>
//       <Divider sx={{ borderColor: 'var(--mui-palette-neutral-700)' }} />
//       <Box component="nav" sx={{ flex: '1 1 auto', p: '12px' }}>
//         {renderNavItems({ pathname, items: navItems })}
//       </Box>
//       <Divider sx={{ borderColor: 'var(--mui-palette-neutral-700)' }} />
//       {/* <Stack spacing={2} sx={{ p: '12px' }}>
//         <div>
//           <Typography color="var(--mui-palette-neutral-100)" variant="subtitle2">
//             Need more features?
//           </Typography>
//           <Typography color="var(--mui-palette-neutral-400)" variant="body2">
//             Check out our Pro solution template.
//           </Typography>
//         </div>
//         <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//           <Box
//             component="img"
//             alt="Pro version"
//             src="/assets/devias-kit-pro.png"
//             sx={{ height: 'auto', width: '160px' }}
//           />
//         </Box>
//         <Button
//           component="a"
//           endIcon={<ArrowSquareUpRightIcon fontSize="var(--icon-fontSize-md)" />}
//           fullWidth
//           href="https://material-kit-pro-react.devias.io/"
//           sx={{ mt: 2 }}
//           target="_blank"
//           variant="contained"
//         >
//           Pro version
//         </Button>
//       </Stack> */}
//     </Box>
//   );
// }

// function renderNavItems({ items = [], pathname }: { items?: NavItemConfig[]; pathname: string }): React.JSX.Element {
//   const children = items.reduce((acc: React.ReactNode[], curr: NavItemConfig): React.ReactNode[] => {
//     const { key, ...item } = curr;

//     acc.push(<NavItem key={key} pathname={pathname} {...item} />);

//     return acc;
//   }, []);

//   return (
//     <Stack component="ul" spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
//       {children}
//     </Stack>
//   );
// }

// interface NavItemProps extends Omit<NavItemConfig, 'items'> {
//   pathname: string;
// }

// function NavItem({ disabled, external, href, icon, matcher, pathname, title }: NavItemProps): React.JSX.Element {
//   const active = isNavItemActive({ disabled, external, href, matcher, pathname });
//   const Icon = icon ? navIcons[icon] : null;

//   return (
//     <li>
//       <Box
//         {...(href
//           ? {
//               component: external ? 'a' : RouterLink,
//               href,
//               target: external ? '_blank' : undefined,
//               rel: external ? 'noreferrer' : undefined,
//             }
//           : { role: 'button' })}
//         sx={{
//           alignItems: 'center',
//           borderRadius: 1,
//           color: 'var(--NavItem-color)',
//           cursor: 'pointer',
//           display: 'flex',
//           flex: '0 0 auto',
//           gap: 1,
//           p: '6px 16px',
//           position: 'relative',
//           textDecoration: 'none',
//           whiteSpace: 'nowrap',
//           ...(disabled && {
//             bgcolor: 'var(--NavItem-disabled-background)',
//             color: 'var(--NavItem-disabled-color)',
//             cursor: 'not-allowed',
//           }),
//           ...(active && { bgcolor: 'var(--NavItem-active-background)', color: 'var(--NavItem-active-color)' }),
//         }}
//       >
//         <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', flex: '0 0 auto' }}>
//           {Icon ? (
//             <Icon
//               fill={active ? 'var(--NavItem-icon-active-color)' : 'var(--NavItem-icon-color)'}
//               fontSize="var(--icon-fontSize-md)"
//               weight={active ? 'fill' : undefined}
//             />
//           ) : null}
//         </Box>
//         <Box sx={{ flex: '1 1 auto' }}>
//           <Typography
//             component="span"
//             sx={{ color: 'inherit', fontSize: '0.875rem', fontWeight: 500, lineHeight: '28px' }}
//           >
//             {title}
//           </Typography>
//         </Box>
//       </Box>
//     </li>
//   );
// }
