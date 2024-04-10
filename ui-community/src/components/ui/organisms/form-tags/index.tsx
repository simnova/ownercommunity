import { PlusOutlined } from '@ant-design/icons';
import { Input, InputRef, Tag, Tooltip } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import styles from './form-tags.module.css';

export interface ComponentProp {
  value?: string[];
  onChange?: (tags: string[]) => void;
}

export type ComponentProps = ComponentProp;

export const FormTags: FC<ComponentProps> = ({ value, onChange }) => {
  const [tags, setTags] = useState(value ?? []);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');

  useEffect(() => {
    onChange!(tags);
  }, [tags, onChange]);

  // let newInput: Input | null = null;
  // let editInput: Input | null = null;

  let newInput = React.useRef<InputRef>(null);
  let editInput = React.useRef<InputRef>(null);

  const handleClose = (removedTag: string) => {
    const filteredTags = tags.filter((tag) => tag !== removedTag);
    console.log(filteredTags);
    setTags(filteredTags);
  };

  useEffect(() => {
    if (inputVisible) {
      newInput?.current?.focus();
    }
  }, [inputVisible]);

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      let newTags = [...tags, inputValue];
      setTags(newTags);
    }
    setInputVisible(false);
    setInputValue('');
    console.log(tags);
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setEditInputValue('');
  };

  const saveInputRef = (inputRef: any) => {
    newInput = inputRef;
  };

  const saveEditInputRef = (inputRef: any) => {
    editInput = inputRef;
  };

  return (
    <>
      {tags.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={saveEditInputRef}
              key={tag}
              size="small"
              className={styles['tag-input']}
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }

        const isLongTag = tag.length > 20;

        const tagElem = (
          <Tag
            className={styles['edit-tag']}
            key={tag}
            closable={
              true //index !== 0
            }
            onClose={() => handleClose(tag)}
          >
            <span
              onDoubleClick={(e) => {
                  setEditInputIndex(index);
                  setEditInputValue(tag);
                  editInput?.current?.focus();
                  e.preventDefault();
              }}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible && (
        <Input
          ref={saveInputRef}
          type="text"
          size="small"
          className={styles['tag-input']}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag className={styles['site-tag-plus']} onClick={showInput}>
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </>
  );
};
