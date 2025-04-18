type Props = {
  pageNumber: number;
  activePage: boolean;
  handlePageChange: (pageNumber: number) => void;
};
export default function PageButton({
  pageNumber,
  activePage,
  handlePageChange,
}: Props) {
  const pageBtnStyle =
    'px-4 py-2 bg-white dark:bg-stone-900 text-blue-700 dark:text-white shadow-md rounded-md border dark:border-none hover:bg-blue-900 dark:hover:bg-blue-800 border-slate-300 hover:text-white';
  const activePageBtnStyle =
    'px-4 py-2 rounded-md text-white bg-blue-800 dark:bg-blue-800';
  return (
    <button
      className={activePage ? activePageBtnStyle : pageBtnStyle}
      key={pageNumber}
      onClick={() => handlePageChange(pageNumber)}
      aria-label={`Go to ${pageNumber}`}
    >
      {pageNumber}
    </button>
  );
}
