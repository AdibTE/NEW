import React, { useState, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 } from 'uuid';

const TagInput = ({ formData, setFormData }) => {
    const addTag = (e) => {
        if ((e.type === 'keydown' && e.keyCode === 13 && e.target.value) || e.type === 'click') {
            e.preventDefault();
            input.current.focus();
            let value = e.type === 'keydown' ? e.target.value : e.currentTarget.innerText;
            setSelectedTags([ ...selectedTags, { title: value, id: v4() } ]);
            setInputValue('');
            setSearchResult([]);
            setFormData({ ...formData, tags: selectedTags });
        }
    };
    const removeTag = (e) => {
        setSelectedTags(
            selectedTags.filter((tag) => {
                return tag.title !== e.currentTarget.innerText;
            })
        );
        setFormData({ ...formData, tags: selectedTags });
    };
    const search = (e) => {
        let value = e.target.value;
        setInputValue(value);
        let result = tags.filter((tag) => {
            return tag.title.includes(value);
        });
        if (value) {
            result.length > 0 ? setSearchResult(result) : setSearchResult([ { title: value, id: 159753 } ]);
        } else {
            setSearchResult([]);
        }
    };
    const [ inputValue, setInputValue ] = useState('');
    const [ isFocused, setIsFocused ] = useState(false);
    const [ mouseIsOver, setMouseIsOver ] = useState(false);
    const [ selectedTags, setSelectedTags ] = useState([]);
    const [ searchResult, setSearchResult ] = useState([]);
    const tags = [
        { title: 'جاوااسکریپت', id: v4() },
        { title: 'پایتون', id: v4() },
        { title: 'نود جی اس', id: v4() },
        { title: 'دات نت کور', id: v4() },
        { title: 'design patterns', id: v4() }
    ];
    const input = useRef(inputValue);
    return (
        <div
            className={isFocused ? 'tag-input-container tag-input-Focused' : 'tag-input-container'}
            onClick={() => {
                setIsFocused(true);
            }}
        >
            <input type='hidden' name='tags' value={selectedTags} />

            {selectedTags.length > 0 ? (
                <TransitionGroup component='ul'>
                    {selectedTags.map((tag) => (
                        <CSSTransition key={tag.id} timeout={500} classNames='tg'>
                            <li onClick={removeTag} className='tag'>
                                {tag.title}
                                <i className='fas fa-minus' />
                            </li>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            ) : (
                <p>برچسب ها و مهارت های مورد نیاز</p>
            )}

            {isFocused && (
                <div
                    className='tags-search-container'
                    onMouseOver={() => {
                        setMouseIsOver(true);
                    }}
                    onMouseLeave={() => {
                        setMouseIsOver(false);
                    }}
                >
                    <input
                        type='text'
                        autoFocus
                        placeholder='مهارت...'
                        value={inputValue}
                        ref={input}
                        onChange={search}
                        onFocus={() => {
                            setIsFocused(true);
                        }}
                        onBlur={() => {
                            !mouseIsOver && setIsFocused(false);
                        }}
                        onKeyDown={addTag}
                    />
                    {searchResult && (
                        <TransitionGroup component='ul'>
                            {searchResult.map((tag) => (
                                <CSSTransition key={tag.id} timeout={500} classNames='tg'>
                                    <li className='tag' onClick={addTag}>
                                        {tag.title} <i className='fas fa-plus' />
                                    </li>
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                    )}
                </div>
            )}
        </div>
    );
};

export default TagInput;
