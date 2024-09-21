import type { Auction, AuctionContextType, AuctionOnChain, Bid, BidFormData } from "@app/types/auction";
import {} from "@app/types/auction";
import useTranslation from "next-translate/useTranslation";
import type React from "react";
import { createContext, useEffect, useState } from "react";

import { useAuctionHouse } from "@app/hooks/useAuctionHouse";

// Define the default values and functions
const defaultAuctionContextValue: AuctionContextType = {
  auction: null,
  auctionEndTimeUI: 0,
  setAuctionEndTimeUI: () => {},
  bidFormData: { bid: undefined },
  setBidFormData: () => {},
  endAuction: () => {},
  settleAuction: () => {},
  addBidToAuction: () => {},
};

export const AuctionContext = createContext<AuctionContextType>(defaultAuctionContextValue);

/**
 * Props definition for AuctionProvider component.
 */
type AuctionProps = {
  children: React.ReactNode;
  auctionId: number | null;
};

export const AuctionProvider: React.FC<AuctionProps> = ({
  children,
  auctionId,
}: {
  children: React.ReactNode;
  auctionId: number | null;
}) => {
  const { allAuctions, refreshAuctions } = useAuctionHouse(); // Access AuctionHouse context
  const [auction, setAuction] = useState<Auction | null>(null);
  const [auctionEndTimeUI, setAuctionEndTimeUI] = useState<number>(0);
  const [bidFormData, setBidFormData] = useState<BidFormData>({
    bid: undefined,
  });

  const { t } = useTranslation("common");

  useEffect(() => {
    if (allAuctions.length > 0 && auctionId !== null) {
      const foundAuction = allAuctions.find((auction) => auction.id === auctionId) ?? null;
      if (!foundAuction) {
        // TODO: Redirect user to "404 not found" page
        console.error(`Failed to find auction with ID: ${auctionId}`);
      } else {
        setAuction(foundAuction);
      }
    }
  }, [auctionId, allAuctions]);

  // Add this useEffect to log the auction object whenever it changes
  /*   useEffect(() => {
    console.info(`Auction data updated for ID: ${auctionId}`, auction);
  }, [auction]); */

  if (!auction) {
    // Optionally show a loading state here instead of rendering nothing
    return <div>{t("Loading...")}</div>; // or <Loading />
  }

  // Function to optimistically add a new bid to an auction
  const addBidToAuction = (_auctionOnChain: AuctionOnChain, _newBid: Bid) => {
    /* refreshAuctions((current: FetchAuctionsResponse | undefined) => {
      if (!current || !current.auctions) return current;

      const updatedAuctions = current.auctions.map((auction) => {
        if (Number(auction.id) === auctionOnChain.id) {
          const updatedAuction = {
            ...auction,
            amount: auctionOnChain.amount, // Update the amount with the new bid's amount
            amountDisplay: formatEtherWithDecimals(auctionOnChain.amount, 4), // Update display value
            startTime: auctionOnChain.startTime,
            endTime: auctionOnChain.endTime,
            bidder: { id: auctionOnChain.bidder },
            bids: [...auction.bids, newBid], // Add new bid to bids array
          };
          return updatedAuction;
        }
        return auction;
      });

      return { ...current, auctions: updatedAuctions };
    }, false); */
  };

  // Function to optimistically update an auction's ended status in UI
  // see /app/components/auction/AuctionTimer.ts
  const endAuction = (auctionId: number) => {
    //console.info(`Optimistically ending auction ID: ${auctionId}`);
    if (!allAuctions) return; // Ensure allAuctions is not undefined.

    const updatedAuctions = allAuctions.map((auction) => {
      if (auction.id === auctionId) {
        //console.info(`Updating ended status for Auction ID: ${auctionId}`);
        return { ...auction, ended: true };
      }
      return auction;
    });

    refreshAuctions(updatedAuctions); // Pass the updated list directly to refreshAuctions
  };

  // Function to optimistically update an auction's settled status
  const settleAuction = (auctionId: number) => {
    //console.info(`Optimistically ending auction ID: ${auctionId}`);
    if (!allAuctions) return; // Ensure allAuctions is not undefined.

    const updatedAuctions = allAuctions.map((auction) => {
      if (auction.id === auctionId) {
        //console.info(`Updating ended status for Auction ID: ${auctionId}`);
        return { ...auction, settled: true };
      }
      return auction;
    });

    refreshAuctions(updatedAuctions); // Pass the updated list directly to refreshAuctions
  };

  const value: AuctionContextType = {
    auction,
    auctionEndTimeUI,
    setAuctionEndTimeUI,
    bidFormData,
    setBidFormData,
    endAuction,
    settleAuction,
    addBidToAuction,
  };

  return <AuctionContext.Provider value={value}>{children}</AuctionContext.Provider>;
};
