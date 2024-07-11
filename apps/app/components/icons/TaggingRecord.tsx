import React from "react";

export function TaggingRecord({ size = 24 }) {
  // Calculate aspect ratio based on the desired size
  const aspectRatio = 24 / size;

  // Calculate viewBox dimensions dynamically
  const viewBoxDimensions = `0 0 24 ${24 / aspectRatio}`;

  return (
    <svg width={size} height={size} viewBox={viewBoxDimensions} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.25 15.75V16.25C17.25 17.9069 15.9069 19.25 14.25 19.25H7.75C6.09315 19.25 4.75 17.9069 4.75 16.25V7.75C4.75 6.09315 6.09315 4.75 7.75 4.75H10.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M18.7391 7.72763L19.2695 8.25796L19.2695 8.25796L18.7391 7.72763ZM15.456 11.0108L15.9863 11.5411L15.9863 11.5411L15.456 11.0108ZM14.4669 11.5708L14.6488 12.2984L14.6488 12.2984L14.4669 11.5708ZM11.75 12.25L11.0224 12.0681C10.9585 12.3237 11.0334 12.594 11.2197 12.7803C11.406 12.9666 11.6763 13.0415 11.9319 12.9776L11.75 12.25ZM12.4292 9.53312L13.1568 9.71502L13.1568 9.71502L12.4292 9.53312ZM12.9892 8.544L13.5196 9.07433L13.5196 9.07433L12.9892 8.544ZM16.2724 5.26088L15.742 4.73055L15.742 4.73055L16.2724 5.26088ZM18.7391 5.26088L18.2088 5.79121L18.2088 5.79121L18.7391 5.26088ZM18.2088 7.1973L14.9257 10.4804L15.9863 11.5411L19.2695 8.25796L18.2088 7.1973ZM14.285 10.8432L11.5681 11.5224L11.9319 12.9776L14.6488 12.2984L14.285 10.8432ZM12.4776 12.4319L13.1568 9.71502L11.7016 9.35122L11.0224 12.0681L12.4776 12.4319ZM13.5196 9.07433L16.8027 5.79121L15.742 4.73055L12.4589 8.01367L13.5196 9.07433ZM13.1568 9.71502C13.2174 9.47253 13.3428 9.25108 13.5196 9.07433L12.4589 8.01367C12.0899 8.38265 11.8282 8.84498 11.7016 9.35122L13.1568 9.71502ZM14.9257 10.4804C14.7489 10.6572 14.5275 10.7826 14.285 10.8432L14.6488 12.2984C15.155 12.1718 15.6173 11.9101 15.9863 11.5411L14.9257 10.4804ZM18.2088 5.79121C18.5971 6.17949 18.5971 6.80902 18.2088 7.1973L19.2695 8.25796C20.2435 7.28389 20.2435 5.70462 19.2694 4.73055L18.2088 5.79121ZM19.2694 4.73055C18.2954 3.75648 16.7161 3.75648 15.742 4.73055L16.8027 5.79121C17.191 5.40293 17.8205 5.40293 18.2088 5.79121L19.2694 4.73055Z"
        fill="currentColor"
      ></path>
      <path
        d="M7.75 15.25H14.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M7.75 12.25H9.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M7.75 9.25H9.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}
