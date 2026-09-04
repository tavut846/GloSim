import type { Attribute, Schema } from '@strapi/strapi';

export interface ConferenceAgendaItem extends Schema.Component {
  collectionName: 'components_conference_agenda_items';
  info: {
    displayName: 'AgendaItem';
    icon: 'clock';
  };
  attributes: {
    date: Attribute.String;
    day: Attribute.String & Attribute.Required;
    location: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    speaker: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    tag: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    time: Attribute.String & Attribute.Required;
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface ConferenceSpeakerItem extends Schema.Component {
  collectionName: 'components_conference_speaker_items';
  info: {
    displayName: 'SpeakerItem';
    icon: 'user';
  };
  attributes: {
    affiliation: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    bio: Attribute.RichText &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    photo: Attribute.Media<'images'>;
    title: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface HomeHighlightItem extends Schema.Component {
  collectionName: 'components_home_highlight_items';
  info: {
    displayName: 'HighlightItem';
    icon: 'star';
  };
  attributes: {
    icon: Attribute.String;
    label: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    number: Attribute.String & Attribute.Required;
  };
}

export interface SharedNavItem extends Schema.Component {
  collectionName: 'components_shared_nav_items';
  info: {
    displayName: 'NavItem';
    icon: 'bulletList';
  };
  attributes: {
    href: Attribute.String & Attribute.Required;
    label: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface SharedSocialLink extends Schema.Component {
  collectionName: 'components_shared_social_links';
  info: {
    displayName: 'SocialLink';
    icon: 'link';
  };
  attributes: {
    icon: Attribute.String;
    platform: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'conference.agenda-item': ConferenceAgendaItem;
      'conference.speaker-item': ConferenceSpeakerItem;
      'home.highlight-item': HomeHighlightItem;
      'shared.nav-item': SharedNavItem;
      'shared.social-link': SharedSocialLink;
    }
  }
}
