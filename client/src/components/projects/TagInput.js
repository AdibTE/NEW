import React, { useState, useRef, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const TagInput = ({ formData, setFormData }) => {
    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const addTag = (e) => {
        if ((e.type === 'keydown' && e.keyCode === 13) || e.type === 'click') {
            e.preventDefault();
            input.current.focus();
            e.type === 'keydown'
                ? setSelectedTags([ ...selectedTags, e.target.value ])
                : setSelectedTags([ ...selectedTags, e.currentTarget.innerText ]);
            setInputValue('');
            setSearchResult([]);
        }
    };
    const removeTag = (e) => {
        setSelectedTags(
            selectedTags.filter((tag) => {
                return tag !== e.currentTarget.innerText;
            })
        );
    };
    const search = (e) => {
        let value = e.target.value;
        setInputValue(value);
        let result = tags.filter((tag) => {
            return tag.includes(value);
        });
        if (value) {
            result.length > 0 ? setSearchResult(result) : setSearchResult([ value ]);
        } else {
            setSearchResult([]);
        }
    };
    const [ inputValue, setInputValue ] = useState('');
    const [ isFocused, setIsFocused ] = useState(false);
    const [ mouseIsOver, setMouseIsOver ] = useState(false);
    const [ selectedTags, setSelectedTags ] = useState([]);
    const [ searchResult, setSearchResult ] = useState([]);
    const tags = [ 'جاوااسکریپت', 'پایتون', ' نود جی اس', 'دات نت کور', 'design patterns' ];
    const input = useRef(inputValue);
    useEffect(() => {});
    return (
        <div
            className={isFocused ? 'tag-input-container tag-input-Focused' : 'tag-input-container'}
            onClick={() => {
                setIsFocused(true);
            }}
        >
            {selectedTags.length > 0 ? (
                <TransitionGroup component='ul'>
                    {selectedTags.map((tag, i) => (
                        <CSSTransition key={i} timeout={500} classNames='tg'>
                            <li onClick={removeTag} className='tag'>
                                {tag}
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
                    <input type='hidden' name='tags' value={selectedTags} onChange={changeHandler} />
                    {searchResult && (
                        <TransitionGroup component='ul'>
                            {searchResult.map((tag, i) => (
                                <CSSTransition key={i} timeout={500} classNames='tg'>
                                    <li className='tag' onClick={addTag} key={i}>
                                        {tag} <i className='fas fa-plus' />
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
