import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  offersDataSliceActions,
  offersDataSliceSelectors,
} from "store/redux/offers/offers";
import OfferCardCopy from "components/OfferCard/OfferCard";
import { categorysDataSliceSelectors } from "store/redux/category/categorySlice";

import {
  CategoryPageWrapper,
  CategoryTextWrapper,
  OffersWrapper,
  PaginationButton,
  PaginationCurrentButton,
  PaginationEllipsis,
  PaginationWrapper,
  Tile,
  TileLeer,
} from "./styles";

function CategoryPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Id не найден</div>;
  }

  const categoryId = id.replace("id=", "");
  const categoryIdNumber = parseInt(categoryId, 10);

  const dispatch = useAppDispatch();
  const {
    data: offers,
    statusOffer,
    isFirstPage,
    isLastPage,
    pageNumber,
    totalPages,
  } = useAppSelector(offersDataSliceSelectors.offer);
  const [page, setPage] = useState(0);
  const size = 10;
  const sortBy = "createdAt";
  const isAsc = false;
  const category_id = categoryIdNumber;
  const status = "AUCTION_STARTED";

  const categoryDataSlice = useAppSelector(
    categorysDataSliceSelectors.category,
  );
  const categoriesData = categoryDataSlice.data;

  useEffect(() => {
    dispatch(
      offersDataSliceActions.getAllOffer({
        page,
        size,
        sortBy,
        isAsc,
        category_id,
        status,
      }),
    );
  }, [dispatch, page, size, sortBy, isAsc, category_id, status]);

  const filteredOffers = offers.filter(
    (offer) => offer.categoryId === categoryIdNumber,
  );

  const category = categoriesData.find((cat) => cat.id === categoryIdNumber);
  const name = category ? category.name : "Категория не найдена";

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <CategoryPageWrapper>
      <CategoryTextWrapper>
        <Tile>{name}</Tile>
      </CategoryTextWrapper>
      {filteredOffers.length === 0 ? (
        <OffersWrapper>
          <TileLeer>
            There are no active offers found for this category.
          </TileLeer>
        </OffersWrapper>
      ) : (
        <>
          <OffersWrapper>
            <OfferCardCopy offers={filteredOffers} />
          </OffersWrapper>
          {statusOffer === "loading" && <div>Loading...</div>}
          {statusOffer === "success" && (
            <PaginationWrapper>
              {!isFirstPage && pageNumber !== null && (
                <PaginationButton
                  onClick={() => handlePageChange(pageNumber - 1)}
                >
                  {pageNumber}
                </PaginationButton>
              )}

              {pageNumber !== null && (
                <PaginationCurrentButton
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber + 1}
                </PaginationCurrentButton>
              )}

              {!isLastPage && pageNumber !== null && totalPages !== null && (
                <>
                  {pageNumber < totalPages - 2 && (
                    <PaginationButton
                      onClick={() => handlePageChange(pageNumber + 1)}
                    >
                      {pageNumber + 2}
                    </PaginationButton>
                  )}
                </>
              )}

              {!isLastPage && totalPages !== null && totalPages > 1 && (
                <>
                  {pageNumber !== null && pageNumber < totalPages - 2 && (
                    <PaginationEllipsis>...</PaginationEllipsis>
                  )}
                  <PaginationButton
                    onClick={() => handlePageChange(totalPages - 1)}
                  >
                    {totalPages}
                  </PaginationButton>
                </>
              )}
            </PaginationWrapper>
          )}
        </>
      )}
    </CategoryPageWrapper>
  );
}

export default CategoryPage;
