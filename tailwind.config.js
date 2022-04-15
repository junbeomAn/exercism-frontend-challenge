module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      width: {
        testimonial: '1376px',
        search: '416px',
        dropdown: '376px',
        dot: '9px',
        title: '332px',
        'testimonial-content': '525px',
        'sort-option': '348px',
        'icon-big': '42px',
        'icon-md': '36px',
        'icon-sm': '32px',
        'check-box': '21px',
        'title-top': '680px',
      },
      minWidth: {
        title: '332px',
      },
      height: {
        testimonial: '640px',
        search: '48px',
        dropdown: '364px',
        filter: '80px',
        dot: '9px',
        pagination: '70px',
        title: '43px',
        header: '64px',
        'list-container': '791px',
        'testimonial-item': '64px',
        'dropdown-item': '58px',
        'sort-option': '48px',
        'icon-big': '42px',
        'icon-md': '36px',
        'icon-sm': '32px',
        'check-box': '21px',
        'rel-time-height': '19px',
        'page-btn': '40px',
        'title-top': '155px',
        'nav-tab': '24px',
      },
      borderRadius: {
        outer: '8px',
        inner: '5px',
        circle: '50%',
        'half-circle': '100px',
      },
      boxShadow: {
        container: '0px 4px 42px rgba(79, 114, 205, 0.15)',
        'filter-active': '0px 0px 2px 2px rgba(46, 87, 232, 0.25)',
        'btn-active': '0px 1px 0px 1px rgba(203, 201, 217, 0.6)',
        'alarm-bell': '0px 4px 24px rgba(156, 130, 38, 0.4)',
      },
      colors: {
        'label-default': '#130B43',
        'label-tertiary': '#76709F',
        'dark-text-label-default': '#F0F3F9',
        'dark-text-label-secondary': '#A9A6BD',
        'label-secondary': '#5C5589',
        'light-text-default-base': '#3F3A5A',
        // 'not-selected': '#A9A6BD',
        'light-border': '#D5D8E4',
        'light-border-grey': '#EAECF3',
        'item-bg-grey': '#F4F7FD',
        'light-divider': '#E0E0ED',
        'light-highlight': '#E1EBFF',
        'dark-text-default-base': '#CBC9D9',
        'dark-border-grey': '#C8D5EF',
        alert: '#D85050',
        selected: '#6A6781',
        'light-blue': '#2E57E8',
      },
      spacing: {
        '2px': '2px',
        '3px': '3px',
        '4px': '4px',
        '7px': '7px',
        '8px': '8px',
        '10px': '10px',
        '11px': '11px',
        '12px': '12px',
        '13px': '13px',
        '16px': '16px',
        '21px': '21px',
        '24px': '24px',
        '32px': '32px',
        '40px': '40px',
        '44px': '44px',
        '48px': '48px',
        '56px': '56px',
      },
      inset: {
        content: '536px',
      },
      fontSize: {
        h2: ['31.25px', '43px'],
        sm: '13px',
        base: '14px',
        'md-sm': '15px',
        md: '16px',
      },
      backgroundImage: {
        'alarm-bell':
          'linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%), #FFF4E3',
      },
      lineHeight: {
        '19px': '19px',
        '21px': '21px',
        '22px': '22px',
        '24px': '24px',
        '26px': '26px',
        '40px': '40px',
      },
      borderWidth: {
        3: '3px',
      },
    },
  },
  plugins: [],
};