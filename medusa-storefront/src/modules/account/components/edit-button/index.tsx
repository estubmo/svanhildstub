import React from 'react';

const EditButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> = (
  props,
) => {
  return (
    <div>
      <button
        className="text-small-regular mt-2 text-ui-fg-subtle underline"
        {...props}
      >
        Edit
      </button>
    </div>
  );
};

export default EditButton;
