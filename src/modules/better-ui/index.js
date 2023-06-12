import { addUIStyles } from '../utils';

// Unsorted styles.
import styles from './styles.css';

import betterLuckyCatchIcon from './styles/better-lucky-catch-icon.css';
import footer from './styles/footer.css';
import overlays from './styles/overlays.css';
import scoreboards from './styles/scoreboards.css';
import select2 from './styles/select2.css';
import sidebar from './styles/sidebar.css';
import tabs from './styles/tabs.css';
import team from './styles/team.css';
import tournamentStyles from './styles/tournaments.css';
import traps from './styles/traps.css';
import maps from './styles/maps.css';

// HUD styles
import toxicSpill from './location-styles/toxic-spill.css';
import train from './location-styles/train.css';

import tournaments from './tournaments';

const getStyles = () => {
  return [
    betterLuckyCatchIcon,
    footer,
    overlays,
    scoreboards,
    select2,
    sidebar,
    styles,
    tabs,
    team,
    tournamentStyles,
    traps,
    maps,
    toxicSpill,
    train,
  ].join('\n');
};

const kingsPromoTextChange = () => {
  const kingsPromo = document.querySelector('.shopsPage-kingsCalibratorPromo');
  if (kingsPromo) {
    kingsPromo.innerHTML = kingsPromo.innerHTML.replace('and even', 'and');
  }
};

export default () => {
  addUIStyles(getStyles());

  onAjaxRequest(kingsPromoTextChange, 'managers/ajax/users/dailyreward.php');

  tournaments();
};
