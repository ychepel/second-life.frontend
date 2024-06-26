import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

import Select from "components/Select/Select";
import { SelectDataProps } from "components/Select/types";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  locationsDataSliceActions,
  locationsDataSliceSelectors,
} from "store/redux/location/locationSlice";
import {
  categorysDataSliceActions,
  categorysDataSliceSelectors,
} from "store/redux/category/categorySlice";
import DropDownMenu from "components/DropDownMenu/DropDownMenu";
import DropDownUser from "components/DropDownUser/DropDownUser";
import { userDataSliceActions } from "store/redux/user/userSlice";

import {
  LayoutWrapper,
  Container,
  Header,
  HeaderTitleContainer,
  NavContainer,
  Main,
  StyledNavLink,
  HeaderTitle,
  HeaderLogoContainer,
  HeaderLogo,
  IconsContainer,
  HeaderUserContainer,
  HeaderLoginContainer,
  HeaderLogin,
  UpHeaderWrapper,
  DownWrapper,
  Footer,
  InfoContainer,
  InfoContainerText,
  InfoContainerWrapper,
  MailContainer,
  MailContainerText,
  SearchInput,
  SearchWrapper,
  SearchButton,
  FooterWrapper,
  LogoutButton,
  SearchSelectContainer,
  SelectWrapper,
} from "./styles";
import { LocationData } from "./types";
import { typeOfferDataMenu } from "./OffersDataMenu";

const BASE_URL = "https://second-life-app-y2el9.ondigitalocean.app/api";

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location_page = useLocation();

  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken"),
  );
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<string>(() => {
    const savedLocation = localStorage.getItem("selectedLocation");
    return savedLocation || "";
  });
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data: locationsData } = useAppSelector(
    locationsDataSliceSelectors.location,
  );
  const { data: catigoriesData } = useAppSelector(
    categorysDataSliceSelectors.category,
  );

  useEffect(() => {
    dispatch(locationsDataSliceActions.getLocation());
    dispatch(categorysDataSliceActions.getCategory());
    if (accessToken) {
      dispatch(userDataSliceActions.getUserData());
    }
  }, [dispatch, accessToken]);

  useEffect(() => {
    if (locationsData.length > 0) {
      const defaultLocation = locationsData.find(
        (loc) => loc.name === "All Germany",
      );
      setSelectedLocation(
        defaultLocation ? defaultLocation.name : locationsData[0].name,
      );
      setLoading(false);
    }
  }, [locationsData]);

  const locationOptions: SelectDataProps<string>[] = locationsData
    .map((location: LocationData) => ({
      selectData: {
        index: location.id,
        value: location.name,
      },
    }))
    .concat({
      selectData: {
        index: 0,
        value: "All Germany",
      },
    })
    .sort((a, b) => (a.selectData.index < b.selectData.index ? -1 : 1));

  const goToHomePage = () => navigate("/");

  const handleLogout = async () => {
    try {
      await sendLogoutRequest();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");
      setAccessToken(null);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    const handleTokenUpdate = () => {
      setAccessToken(localStorage.getItem("accessToken"));
      setLoading(false);
    };

    window.addEventListener("tokenUpdated", handleTokenUpdate);
    handleTokenUpdate();

    return () => {
      window.removeEventListener("tokenUpdated", handleTokenUpdate);
    };
  }, []);

  const sendLogoutRequest = async () => {
    try {
      const response = await fetch(`${BASE_URL}/v1/auth/user/logout`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to logout");
      }
    } catch (error) {
      console.error("Error logging out:", error as Error);
    }
  };

  const handleLocationChange = (selectedValue: string | undefined) => {
    setSelectedLocation(selectedValue as string);
    console.log("Selected location:", selectedValue);
  };

  const handleSearch = () => {
    console.log("Search Term:", searchTerm);
    console.log("Selected Location:", selectedLocation);
    if (selectedLocation !== "All Germany") {
      const selectedLocationData = locationsData.find(
        (loc) => loc.name === selectedLocation,
      );
      if (selectedLocationData) {
        navigate(
          `/search/${encodeURIComponent(searchTerm)}/${selectedLocationData.id}`,
        );
      }
    } else {
      navigate(`/search/${encodeURIComponent(searchTerm)}`);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <LayoutWrapper>
      <Header>
        <Container>
          <UpHeaderWrapper>
            <HeaderTitleContainer onClick={goToHomePage}>
              <HeaderLogoContainer>
                <HeaderLogo />
              </HeaderLogoContainer>
              <HeaderTitle>SECOND LIFE</HeaderTitle>
            </HeaderTitleContainer>
            <SearchSelectContainer>
              <SearchWrapper>
                <SearchInput
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <SearchButton onClick={handleSearch}>
                  <FaSearch />
                </SearchButton>
              </SearchWrapper>
              <SelectWrapper>
                <Select
                  name="location"
                  options={locationOptions}
                  onChange={handleLocationChange}
                  value={selectedLocation}
                  borderRadius="25px"
                  height="40px"
                  isSelectOpen={false}
                />
              </SelectWrapper>
            </SearchSelectContainer>

            <IconsContainer>
              <HeaderUserContainer isActive={!!accessToken}>
                {accessToken && <DropDownUser />}
              </HeaderUserContainer>
              {accessToken ? (
                <HeaderLoginContainer>
                  <LogoutButton onClick={handleLogout}>
                    <HeaderLogin />
                  </LogoutButton>
                </HeaderLoginContainer>
              ) : (
                <Link to="/auth/user/login" style={{ textDecoration: "none" }}>
                  <HeaderLoginContainer>
                    <HeaderLogin />
                  </HeaderLoginContainer>
                </Link>
              )}
            </IconsContainer>
          </UpHeaderWrapper>
        </Container>
        <DownWrapper>
          <Container>
            <NavContainer>
              <StyledNavLink to="/" isActive={location_page.pathname === "/"}>
                Home
              </StyledNavLink>

              <DropDownMenu
                items={catigoriesData.map((category) => ({
                  id: category.id,
                  value: category.name,
                  to: `/category/id=${category.id}`,
                }))}
                label={"Categories"}
                link={"/category"}
              />

              <DropDownMenu
                items={typeOfferDataMenu.map((typeOffer) => ({
                  id: typeOffer.id,
                  value: typeOffer.value,
                  to: `/offers/all/id=${typeOffer.id}`,
                }))}
                label={"Offers"}
                link={"/offers/all"}
              />

              <StyledNavLink
                isActive={location_page.pathname === "/aboutUs"}
                to="/aboutUs"
              >
                About us
              </StyledNavLink>
            </NavContainer>
          </Container>
        </DownWrapper>
      </Header>
      <Main>
        <Outlet /> {/* Render child routes here */}
      </Main>

      <Footer>
        <Container>
          <FooterWrapper>
            <InfoContainerWrapper>
              <InfoContainer>
                <InfoContainerText>
                  Give a second life to your belongings with SecondLife - your
                  best partner in buying and selling quality goods!
                </InfoContainerText>
              </InfoContainer>
            </InfoContainerWrapper>
            <InfoContainerWrapper>
              <MailContainer>
                <MailContainerText>+3 333-333-333</MailContainerText>
              </MailContainer>
              <MailContainer>
                <MailContainerText>info@second-life.space</MailContainerText>
              </MailContainer>
            </InfoContainerWrapper>
          </FooterWrapper>
        </Container>
      </Footer>
    </LayoutWrapper>
  );
};

export default Layout;
