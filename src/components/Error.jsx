import React, { useState, useEffect } from 'react';

export default function Error(props) {
  return (
    <>
      <div>Error...{props.message}</div>
    </>
  );
}
