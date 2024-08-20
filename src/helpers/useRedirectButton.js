import { useHistory } from 'react-router-dom';

function useRedirectButton(path) {
    const history = useHistory();

    function handleRedirect() {
        history.push(path);
    }

    return handleRedirect;
}

export default useRedirectButton;
