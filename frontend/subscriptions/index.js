import { appDidStart$ } from '@shopgate/pwa-common/streams/app';
import showModal from '@shopgate/pwa-common/actions/modal/showModal';
import { historyReplace} from '@shopgate/pwa-common/actions/router';
import { PATH_INTRO_VIDEO } from '../constants';

/**
 * Intro video subscriptions
 * @param {Function} subscribe The subscribe function
 */
export default function introVideo(subscribe) {

  const LOCAL_STORAGE_KEY = '@shopgate-project/intro-video.presented';

  subscribe(appDidStart$, async ({ dispatch, getState }) => {
    // show the modal if it wasn't shown before
    const showModel = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY)) === null;

    if (!showModel) {
      return;
    }

    window.localStorage.setItem(LOCAL_STORAGE_KEY, true);
    const skipIt = await dispatch(showModal({
      title: 'Harbor Freight App Features', // TODO:
      message: 'Learn about new app features',
      confirm: 'Skip',
      dismiss: 'Watch',
    }));

    if (skipIt) {
      return;
    }

    dispatch(historyReplace({
      pathname: PATH_INTRO_VIDEO,
    }));
  });
}
