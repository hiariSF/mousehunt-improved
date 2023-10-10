const reorderBlocks = () => {
  if ('friends' !== getCurrentPage()) {
    return;
  }

  const reordered = document.querySelector('.mousehuntHud-page-subTabContent.community');
  if (! reordered || reordered.getAttribute('data-reordered')) {
    return;
  }

  const blocks = document.querySelectorAll('.friendsPage-community-channel');
  if (! blocks || blocks.length < 3) {
    return;
  }

  // Move the third block to the top and make the input bigger.
  const block = blocks[2];
  const parent = block.parentNode;
  parent.removeChild(block);
  parent.insertBefore(block, parent.firstChild);
  block.classList.add('friends-page-id-search');

  const input = block.querySelector('input');
  if (input) {
    // disable the 1password icon
    input.setAttribute('data-1p-ignore', 'true');
  }

  reordered.setAttribute('data-reordered', 'true');
};

const autofocusIdSearch = () => {
  const input = document.querySelector('.friendsPage-community-hunterIdForm-input');
  if (! input) {
    return;
  }

  input.focus();
};

const maybeRedirectToHunterProfile = (text) => {
  if (! /^\d+$/.test(text)) {
    return;
  }

  hg.utils.PageUtil.setPage('HunterProfile', {
    id: text,
  });
};

const listenForIDPaste = () => {
  // listen for the user hitting the paste shortcut.
  window.addEventListener('paste', (e) => {
    // if we're currently focused in an input, then don't do anything
    if (
      document.activeElement instanceof HTMLInputElement || // eslint-disable-line @wordpress/no-global-active-element
      document.activeElement instanceof HTMLTextAreaElement || // eslint-disable-line @wordpress/no-global-active-element
      document.activeElement instanceof HTMLSelectElement // eslint-disable-line @wordpress/no-global-active-element
    ) {
      return;
    }

    maybeRedirectToHunterProfile(e.clipboardData.getData('text'));
  });
};

export default () => {
  onNavigation(reorderBlocks, {
    page: 'friends'
  });

  onNavigation(autofocusIdSearch, {
    page: 'friends',
    tab: 'requests',
    subtab: 'community',
  });

  listenForIDPaste();
};
