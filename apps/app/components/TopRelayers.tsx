import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRelayers } from "../hooks/useRelayers";
import { toDp, toEth } from "../utils";
import { CopyAndPaste } from "./CopyAndPaste";

const TopRelayers = () => {
  const { t } = useTranslation("common");
  const { relayers } = useRelayers({ pageSize: 3 });

  return (
    <div className="w-full mx-auto">
      <div className="rounded-md shadow-lg shadow-slate-400/20 ring-1 ring-slate-200">
        <div className="border-b border-slate-200">
          <Link href="/explore/relayers" className="flex justify-between rounded-t-md" legacyBehavior passHref>
            <div>
              <h2 className="px-6 py-3 font-semibold text-left text-slate-700">{t("top-relayers")}</h2>
            </div>
            <div className="flex items-center pr-2">
              <svg className="inline-flex w-6 h-6 text-pink-600 hover:text-pink-700" fill="none" viewBox="0 0 24 24">
                <title>Open main menu</title>
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M17.25 15.25V6.75H8.75"
                />
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M17 7L6.75 17.25"
                />
              </svg>
            </div>
          </Link>
        </div>

        <div className="divide-y rounded-b-md divide-slate-200">
          {/* TODO: update :any to use type */}
          {relayers?.map((relayer: any) => (
            <div className="grid grid-flow-col grid-cols-2 px-6 py-4 space-x-4" key={relayer.id}>
              <div>
                <div className="flex space-x-2">
                  <div className="flex-grow overflow-hidden text-right text-pink-600 hover:text-pink-700 text-ellipsis whitespace-nowrap">
                    <Link
                      href={`/explore/relayers/${relayer.id}`}
                      className="text-pink-600 hover:text-pink-700"
                      legacyBehavior
                      passHref
                    >
                      {relayer.id}
                    </Link>
                  </div>
                  <CopyAndPaste value={relayer.id} />
                </div>
                <div className="text-sm leading-6 text-slate-500">
                  {t("tag-count", { count: Number.parseInt(relayer.mintCount) })}
                </div>
              </div>
              <div className="col-span-2">
                <div className="overflow-hidden text-slate-700 text-ellipsis whitespace-nowrap">
                  {toEth(relayer.tagFees, 4)} {t("eth-earned")}
                </div>
                <div className="text-sm leading-6 text-slate-500">
                  {t("tagged-count", { count: Number.parseInt(relayer.tagCount) })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { TopRelayers };
