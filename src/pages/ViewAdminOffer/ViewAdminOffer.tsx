import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "components/Button/Button.tsx";
import { useAppDispatch, useAppSelector } from "store/hooks.ts";
import { Img } from "pages/ViewOffer/styles.ts";
import { offerDataSliceActions } from "store/redux/offer/offer.ts";
import { locationsDataSliceSelectors } from "store/redux/location/locationSlice.ts";
import { OfferData } from "store/redux/offer/types.ts";
import { categorysDataSliceSelectors } from "store/redux/category/categorySlice.ts";
import { typeOfferData } from "pages/CreateOffer/OffersData.ts";

import {
  CategoryButtonWrapper,
  CategoryButtonsWrapper,
  CategoryImageWrapper,
  CategoryInfoTextWrapper,
  CategoryLeftWrapper,
  CategoryWrapper,
  CatogoryInfoWrapper,
  HomeContainer,
  HomeWrapper,
  OfferTextAreaWrapper,
  TextAreaWrapper,
  Tile,
  TileStatus,
  Type00,
  Type01,
  Type02,
} from "./style.ts";

function ViewAdminOffer() {
  const navigate = useNavigate();
  const { offerId = "" } = useParams<{ offerId?: string }>();
  const [offerData, setOfferData] = useState<OfferData | null>(null);

  const dispatch = useAppDispatch();

  const locationsDataSlice = useAppSelector(
    locationsDataSliceSelectors.location,
  );
  const locationsData = locationsDataSlice.data;

  const getLocationNameById = (id: number) => {
    const location = locationsData.find((loc) => loc.id === id);
    return location ? location.name : "Unknown Location";
  };

  const { data: categoriesData } = useAppSelector(
    categorysDataSliceSelectors.category,
  );

  const getCategoryNameById = (id: number) => {
    const category = categoriesData.find((cat) => cat.id === id);
    return category ? category.name : "Unknown Category";
  };

  const formatDate = (dateInput?: string | Date) => {
    if (!dateInput) return "Unknown Date";
    const date =
      typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  };

  const gettypeOfferById = (id: number) => {
    const typeOffer = typeOfferData.find((cat) => cat.id === id);
    return typeOffer ? typeOffer.value : "Unknown Type";
  };

  useEffect(() => {
    console.log("Component mounted with offerId:", offerId);
    if (offerId) {
      dispatch(offerDataSliceActions.getOfferAdminById(offerId))
        .then((response) => {
          console.log("getOfferById response:", response);
          setOfferData(response.payload);
        })
        .catch((error) => {
          console.error("getOfferById error:", error);
        });
    }
  }, [dispatch, offerId]);

  const [timeRemaining, setTimeRemaining] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    let timerInterval: NodeJS.Timeout;

    if (offerData?.auctionEndAt) {
      const targetDate = new Date(offerData.auctionEndAt).getTime();

      timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
          clearInterval(timerInterval);
          setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        } else {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          );
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60),
          );
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          setTimeRemaining({ days, hours, minutes, seconds });
        }
      }, 1000);
    }

    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [offerData]);

  const handleCancel = () => {
    navigate(-1);
  };

  const handleRejected = (id: string) => {
    dispatch(
      offerDataSliceActions.rejectedOfferById({
        offerId: id,
        rejectionReasonId: 1,
      }),
    )
      .then((response) => {
        console.log("rejectedOfferById response:", response);
      })
      .catch((error) => {
        console.error("rejectedOfferById error:", error);
      });
  };

  const handleVerify = (id: string) => {
    dispatch(offerDataSliceActions.verifyOfferById(id))
      .then((response) => {
        console.log("verifyOfferById response:", response);
      })
      .catch((error) => {
        console.error("verifyOfferById error:", error);
      });
  };

  const handleBlocked = (id: string) => {
    dispatch(offerDataSliceActions.blockedOfferById(id))
      .then((response) => {
        console.log("blockedOfferById response:", response);
      })
      .catch((error) => {
        console.error("blockedOfferById error:", error);
      });
  };

  return (
    <HomeWrapper>
      <HomeContainer>
        <CategoryWrapper>
          <CatogoryInfoWrapper>
            <CategoryImageWrapper>
              <Img />
            </CategoryImageWrapper>
            <CategoryLeftWrapper>
              <CategoryInfoTextWrapper>
                <Tile>Title: </Tile>
                <TileStatus>{offerData?.title}</TileStatus>
              </CategoryInfoTextWrapper>
              <CategoryInfoTextWrapper>
                <Tile>Description: </Tile>
              </CategoryInfoTextWrapper>
              <OfferTextAreaWrapper>
                <TextAreaWrapper>{offerData?.description}</TextAreaWrapper>
              </OfferTextAreaWrapper>
              <CategoryInfoTextWrapper>
                <Tile>Status: </Tile>
                <TileStatus>{offerData?.status}</TileStatus>
              </CategoryInfoTextWrapper>
              <CategoryInfoTextWrapper>
                <Tile>Category: </Tile>
                <TileStatus>
                  {offerData ? getCategoryNameById(offerData.categoryId) : ""}
                </TileStatus>
              </CategoryInfoTextWrapper>
              <CategoryInfoTextWrapper>
                <Tile>Location: </Tile>
                <TileStatus>
                  {offerData ? getLocationNameById(offerData.categoryId) : ""}
                </TileStatus>
              </CategoryInfoTextWrapper>
              <CategoryInfoTextWrapper>
                <Tile>Auction duration: </Tile>
                <TileStatus>{offerData?.auctionDurationDays}</TileStatus>
              </CategoryInfoTextWrapper>
              <CategoryInfoTextWrapper>
                <Tile>Auction start: </Tile>
                <TileStatus>{formatDate(offerData?.auctionStartAt)}</TileStatus>
              </CategoryInfoTextWrapper>
              <CategoryInfoTextWrapper>
                <Tile>Auction end: </Tile>
                <TileStatus>{formatDate(offerData?.auctionStartAt)}</TileStatus>
              </CategoryInfoTextWrapper>
              <CategoryInfoTextWrapper>
                <Tile>Timer: </Tile>
                <TileStatus>
                  {timeRemaining.days}d {timeRemaining.hours}h{" "}
                  {timeRemaining.minutes}m {timeRemaining.seconds}s
                </TileStatus>
              </CategoryInfoTextWrapper>
              <CategoryInfoTextWrapper>
                <Tile>Type offer: </Tile>
                <TileStatus>
                  {offerData ? (
                    offerData.isFree ? (
                      <Type00>{gettypeOfferById(0)}</Type00>
                    ) : offerData.winBid === null ? (
                      <Type01>{gettypeOfferById(1)}</Type01>
                    ) : (
                      <Type02>{gettypeOfferById(2)}</Type02>
                    )
                  ) : (
                    ""
                  )}
                </TileStatus>
              </CategoryInfoTextWrapper>
              {!offerData?.isFree && (
                <CategoryInfoTextWrapper>
                  <Tile>Start price: </Tile>
                  <TileStatus>{offerData?.startPrice} €</TileStatus>
                </CategoryInfoTextWrapper>
              )}
              {offerData?.winBid !== null && (
                <CategoryInfoTextWrapper>
                  <Tile>Win bid: </Tile>
                  <TileStatus>{offerData?.startPrice} €</TileStatus>
                </CategoryInfoTextWrapper>
              )}
            </CategoryLeftWrapper>
          </CatogoryInfoWrapper>
          <CategoryButtonsWrapper>
            {offerData?.status === "VERIFICATION" && (
              <>
                <CategoryButtonWrapper>
                  <Button
                    type="button"
                    background="#7b001c"
                    name="Rejected"
                    onButtonClick={() => handleRejected}
                  />
                </CategoryButtonWrapper>
                <CategoryButtonWrapper>
                  <Button
                    type="button"
                    background="#0A5F38"
                    name="Verify"
                    onButtonClick={() => handleVerify}
                  />
                </CategoryButtonWrapper>
              </>
            )}

            {(offerData?.status === "AUCTION_STARTED" ||
              offerData?.status === "QUALIFICATION") && (
              <CategoryButtonWrapper>
                <Button
                  type="button"
                  background="#7b001c"
                  name="Blocked"
                  onButtonClick={() => handleBlocked}
                />
              </CategoryButtonWrapper>
            )}
            <CategoryButtonWrapper>
              <Button
                type="button"
                background="grey"
                name="Back"
                onButtonClick={handleCancel}
              />
            </CategoryButtonWrapper>
          </CategoryButtonsWrapper>
        </CategoryWrapper>
      </HomeContainer>
    </HomeWrapper>
  );
}

export default ViewAdminOffer;