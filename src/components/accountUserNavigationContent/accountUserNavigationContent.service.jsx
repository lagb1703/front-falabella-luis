import { 
    useState,
    useEffect
} from 'react';
import { useLocation } from 'react-router';
import { 
    CircleUserRound, 
    Package, 
    CircleHelp 
} from 'lucide-react';
const defaultBorderButton = "4px solid #ADD500";
const defaultNavigationOptions = [
    {
        name: 'Mi Perfil',
        icon: CircleUserRound,
        href: '/myAccount',
        borderBottom: 'none'
    },
    {
        name: 'Mis Compras',
        icon: Package,
        href: '/orders',
        borderBottom: 'none'
    },
    {
        name: 'Ayuda',
        icon: CircleHelp,
        href: '/help',
        borderBottom: 'none'
    }
]
export function useGetNavigationOption(){
    const location = useLocation();
    const [getNavigationOptions, setGetNavigationOptions] = useState(defaultNavigationOptions);
    useEffect(()=>{
        const currentPath = location.pathname;
        const newNavigationOptions = defaultNavigationOptions.map(option => {
            if (currentPath === option.href) {
                option.borderBottom = defaultBorderButton;
            }
            return option;
        });
        setGetNavigationOptions(newNavigationOptions);
    }, [location.pathname]);
    return getNavigationOptions
}