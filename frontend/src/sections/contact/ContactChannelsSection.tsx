import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import { SectionContainer } from '../../components';
import { contactChannels, type ContactChannel } from '../../pages/contact/contactContent';

const CHANNEL_ICONS: Record<ContactChannel['icon'], typeof WhatsAppIcon> = {
  whatsapp: WhatsAppIcon,
  email: EmailRoundedIcon,
};

const CHANNEL_ACCENTS: Record<ContactChannel['icon'], 'secondary' | 'primary'> = {
  whatsapp: 'secondary',
  email: 'primary',
};

/** Quick-contact strip — the two fastest ways to reach the foundation, above the full form. */
export default function ContactChannelsSection() {
  return (
    <SectionContainer bgcolor="background.paper" labelledBy="contact-channels-heading">
      <Typography
        id="contact-channels-heading"
        variant="overline"
        sx={{ color: 'primary.dark', letterSpacing: 1.2, display: 'block', mb: { xs: 3, md: 4 } }}
      >
        Reach Us Directly
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 3 }}>
        {contactChannels.map((channel) => {
          const Icon = CHANNEL_ICONS[channel.icon];
          const accent = CHANNEL_ACCENTS[channel.icon];

          return (
            <Box
              key={channel.label}
              component="a"
              href={channel.href}
              target={channel.icon === 'whatsapp' ? '_blank' : undefined}
              rel={channel.icon === 'whatsapp' ? 'noopener noreferrer' : undefined}
              sx={{
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 2.5,
                pt: { xs: 3.25, sm: 3.75 },
                px: { xs: 3.5, sm: 4 },
                pb: { xs: 3.5, sm: 4 },
                borderRadius: 4,
                textDecoration: 'none',
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: (theme) => alpha(theme.palette[accent].main, 0.18),
                boxShadow: (theme) => `0 10px 28px -10px ${alpha(theme.palette.grey[900], 0.14)}`,
                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: (theme) => `0 22px 44px -14px ${alpha(theme.palette[accent].main, 0.3)}`,
                },
                '&:focus-visible': {
                  outline: (theme) => `2px solid ${theme.palette[accent].dark}`,
                  outlineOffset: 2,
                },
              }}
            >
              <Box
                aria-hidden="true"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 5,
                  background: (theme) =>
                    `linear-gradient(90deg, ${theme.palette[accent].main} 0%, ${theme.palette[accent].light} 100%)`,
                }}
              />

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 56,
                  height: 56,
                  borderRadius: 3,
                  background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette[accent].main} 0%, ${theme.palette[accent].dark} 100%)`,
                  color: '#ffffff',
                  flexShrink: 0,
                  boxShadow: (theme) => `0 8px 20px -6px ${alpha(theme.palette[accent].main, 0.55)}`,
                }}
              >
                <Icon sx={{ fontSize: 29 }} />
              </Box>

              <Stack spacing={0.75} sx={{ minWidth: 0, flexGrow: 1 }}>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'text.primary' }}>
                    {channel.label}
                  </Typography>
                  <ArrowOutwardRoundedIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
                </Stack>
                <Typography variant="h5" component="p" sx={{ fontWeight: 800, color: `${accent}.dark`, letterSpacing: 0.2 }}>
                  {channel.value}
                </Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: '0.975rem', lineHeight: 1.7 }}>
                  {channel.description}
                </Typography>
              </Stack>
            </Box>
          );
        })}
      </Box>
    </SectionContainer>
  );
}
