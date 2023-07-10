import { useMemo, useCallback, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import {Frame, TopBar, Navigation, AppProvider, Spinner, EmptyState, Card, Page, FormLayout, TextField, Button} from '@shopify/polaris';
import {HomeMinor, CartMajor, ExternalSmallMinor} from '@shopify/polaris-icons';
import { logo } from "../../assets";
import './../../App.css'; 

export function AppBridgeProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [menuState, setMenuState] = useState('home');
  const [checkSession, setCheckSession] = useState(true);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const setPageMarkup = useCallback(
    (value) => setMenuState(value),
    [],
  );

  const toggleIsUserMenuOpen = useCallback(
    () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
    [],
  );


  const [profile, setProfile] = useState({
    name: 'Name',
    detail: 'Domain',
    initials: 'N',
    isloading: true
  });

  const loadUser = async function(){
    var auth = Cookies.get('auth');
    var response = await fetch("/api/profile", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+auth 
      }
    });
    var profile = await response.json().catch(() => {setCheckSession(false)});
    setProfile({name: profile.name, detail: profile.shop, initials: profile.name.charAt(0).toUpperCase(), isloading: false});
  }

  useEffect(() => {
    loadUser()
  }, []);

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={[
        {
          items: [{content : profile.detail, url: 'https://'+profile.detail+'/admin', external:'yes', icon: ExternalSmallMinor }],
        },
        // {
        //   items: [{content: 'Sign out'}],
        // },
      ]}
      name={profile.name}
      detail={profile.detail}
      initials={profile.initials}
      open={isUserMenuOpen}
      onToggle={toggleIsUserMenuOpen}
    />
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={profile.isloading ? <Spinner accessibilityLabel="Spinner" size="small" /> : userMenuMarkup}
    />
  );
  console.log(location.pathname);
  const selectedItem = function(){
    return false;
  }

  var [selectItem, setSelectItem] = useState({
    home: true,
    cart:{
      root: false,
      cross: false,
      settings: false
    }
  });

  const handleSelectItem = (parent, child) => {
    console.log(parent, child);
    const placeholderItems = {
      home: false,
      cart:{
        root: false,
        cross: false,
        settings: false
      }
    };

    if(parent != null && child == null){
      placeholderItems[parent] = true;
    }

    if(parent != null && child != null){
      placeholderItems[parent]["root"]=true;
      placeholderItems[parent][child] = true;
    }
    selectItem = placeholderItems;
    setSelectItem(selectItem);
  }

  const navigationMarkup = (
    <Navigation location='/'>
      <Navigation.Section
        items={[
          {
            url:'#',
            excludePaths: ['#'],
            label: 'Home',
            selected: selectItem.home,
            onClick: () => {
              navigate("/"),
              handleSelectItem('home', null)
            },
            icon: HomeMinor,
          },
          {
            url:'#',
            label: 'Cart',
            onClick: () => { 
              navigate("/cart"),
              handleSelectItem('cart', null)
            },
            selected: selectItem.cart.root,
            icon: CartMajor,
            subNavigationItems:[
              // {
              //   url: '/cart/upsell',
              //   label: 'Upsell',
              // },
              {
                label: 'Cross Sell',
                selected: selectItem.cart.cross,
                onClick: () => {
                  navigate("/cart/cross-sell"),
                  handleSelectItem('cart', 'cross')
                },
              },
              {
                // url: '/cart/settings',
                label: 'Settings',
                selected: selectItem.cart.settings,
                onClick: () => {
                  navigate("/cart/settings"),
                  handleSelectItem('cart', 'settings')
                },
              }
            ]
          },
        ]}
      />
    </Navigation>
  );

  const FrameLogo = {
    width: 120,
    topBarSource: logo,
    url: '/',
    accessibilityLabel: 'Jaded Pixel',
  };

  const [shop, setShop] = useState("");
  const [shopValidate, setShopValidate] = useState(false);
  const redirectToLogin = () => {
    if(shop.includes('myshopify')){
      window.location.href="/api/auth?shop="+shop;
      return true;
    }
    setShopValidate("Invalid url!");
  }

  if(!checkSession){
    return (<Page> <Card>
      <EmptyState
        heading="Login"
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      >
        <div style={{width:'30em'}}>
          <TextField
            placeholder="your-shop.myshopify.com"
            onChange={(e) => setShop(e)}
            error={shopValidate}
            autoComplete="off"
            connectedRight={<Button primary onClick={redirectToLogin}>Login</Button>}
            value={shop}
          />
        </div>
      </EmptyState>
    </Card></Page>);
  }

  return (
    <AppProvider>
      <Frame
        topBar={topBarMarkup}
        logo={FrameLogo}
        navigation={navigationMarkup}
      >
        {children}
      </Frame>
    </AppProvider>
  );
}
