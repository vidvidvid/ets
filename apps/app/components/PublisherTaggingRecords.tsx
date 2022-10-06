import { useState, useMemo, Suspense } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { usePublisherTaggingRecords } from "../hooks/usePublisherTaggingRecords";
import { TimeAgo } from "../components/TimeAgo";
import { Table } from "../components/Table";
import { Button } from "../components/Button";

const pageSize = 20;

const PublisherTaggingRecords: NextPage = () => {
  const { query } = useRouter();
  const { publisher } = query;
  const [skip, setSkip] = useState(0);
  const { t } = useTranslation("common");

  const variables = {
    publisherId: publisher,
    pageSize,
    skip,
    config: {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
    },
  };

  const { publisherTaggingRecords, nextPublisherTaggingRecords, mutate } =
    usePublisherTaggingRecords(variables);

  const chainName: { [key: number]: string } = {
    1: "Ethereum",
    80001: "Polygon Mumbai",
  };

  const nextPage = () => {
    setSkip(skip + 20);
    mutate();
  };

  const prevPage = () => {
    setSkip(skip - 20);
    mutate();
  };

  const columns = useMemo(
    () => ["Target", t("ctags"), t("record-type"), t("date"), t("tagger")],
    [t]
  );

  return (
    <div className="max-w-6xl mx-auto">
      <Head>
        <title>{t("recently-tagged")} | Ethereum Tag Service</title>
      </Head>

      <Table loading={!publisherTaggingRecords} rows={pageSize}>
        {/** 
        <Table.Title>{t("tagging-records")}</Table.Title>
        */}
        <Table.Head>
          <Table.Tr>
            {columns &&
              columns.map((column) => (
                <Table.Th key={column}>{column}</Table.Th>
              ))}
          </Table.Tr>
        </Table.Head>
        <Table.Body>
          {publisherTaggingRecords &&
            publisherTaggingRecords.map((taggingRecord: any) => (
              <Table.Tr key={taggingRecord.id}>
                <Table.Cell value={taggingRecord.target.targetURI} />
                <Table.Cell
                  value={taggingRecord.tags.map((tag: any) => (
                    <ul key={tag.id}>
                      <li>
                        <Link href={`/tags/${tag.machineName}`}>
                          <a className="text-pink-600 hover:text-pink-700">
                            {tag.display}
                          </a>
                        </Link>
                      </li>
                    </ul>
                  ))}
                />
                <Table.Cell value={taggingRecord.recordType} />
                <Table.CellWithChildren>
                  <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                    <TimeAgo date={taggingRecord.timestamp * 1000} />
                  </div>
                </Table.CellWithChildren>
                <Table.Cell value={taggingRecord.tagger.id} copyAndPaste />
              </Table.Tr>
            ))}
        </Table.Body>
      </Table>

      <div className="flex justify-between mt-8">
        <Button disabled={skip === 0} onClick={() => prevPage()}>
          <svg
            className="relative inline-flex w-6 h-6 mr-2 -ml-1"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10.25 6.75L4.75 12L10.25 17.25"
            ></path>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19.25 12H5"
            ></path>
          </svg>
          Prev
        </Button>
        <Button
          disabled={
            nextPublisherTaggingRecords &&
            nextPublisherTaggingRecords.length === 0
          }
          onClick={() => nextPage()}
        >
          Next
          <svg
            className="relative inline-flex w-6 h-6 ml-2 -mr-1"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13.75 6.75L19.25 12L13.75 17.25"
            ></path>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 12H4.75"
            ></path>
          </svg>
        </Button>
      </div>
    </div>
  );
};

export { PublisherTaggingRecords };
