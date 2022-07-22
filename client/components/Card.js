import React from 'react';
import Link from 'next/link';

async function updateCard(oldCard) {
  const newCard = getCardFormData();
  const card = Object.assign({}, oldCard, newCard);

  console.log('OLD CARD', oldCard);
  console.log('NEW CARD', newCard);

  console.log('SENT CARD', card);

  try {
    const res = await fetch('http://localhost:3001/api/card', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(card),
    });
  } catch (error) {
    console.log(error);
  }
}

function getCardFormData() {
  const data = Array.from(
    document.querySelectorAll('#newCardForm input')
  ).reduce((acc, input) => ({ ...acc, [input.id]: input.value }), {});
  const desc = document.querySelector('#newCardForm textarea');
  const full = document.querySelector('#full');
  // const img = document.querySelector('#img');

  data['desc'] = desc.value;
  data['full'] = full.checked;
  // TODO: Convert uploaded image file to URL that can also be displayed
  data['date'] = new Date(Date.now());

  return data;
}

// delete card from Redis database
async function deleteCard(id) {
  try {
    const res = await fetch('http://localhost:3001/api/card', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
  } catch (error) {
    console.log(error);
  }
}

function Card(props) {
  const { id, img, title, desc, author, full, date } = props;
  const time = new Date(date);

  return (
    <>
      <div className='col-6'>
        <div className='card'>
          <div className='row g-0'>
            <div className='col-md-4 border-end'>
              <img
                // src={`url(${img})`}
                src={'https://picsum.photos/1500'}
                className='img-fluid rounded-start'
                alt='...'
              ></img>
            </div>

            <div className='col-md-8'>
              <div className='card-body'>
                <div className='d-flex justify-content-between'>
                  <h5 className='card-title m-0 display-6 fs-4'>
                    <strong>{title}</strong>
                  </h5>
                  <div className='d-flex border rounded'>
                    <div className='btn-group'>
                      <button
                        type='button'
                        className='btn m-0 p-0 px-2'
                        title='Edit card'
                        data-bs-toggle='modal'
                        data-bs-target='#editCard'
                      >
                        <a className='text-secondary'>
                          <i className='bi bi-pencil-fill'></i>
                        </a>
                      </button>
                      <div
                        className='modal fade'
                        id='editCard'
                        data-bs-backdrop='static'
                        data-bs-keyboard='false'
                        tabIndex='-1'
                        aria-labelledby='staticBackdropLabel'
                        aria-hidden='true'
                      >
                        <div className='modal-dialog modal-lg'>
                          <div className='modal-content'>
                            <div className='modal-header'>
                              <h5
                                id='staticBackdropLabel'
                                className='modal-title m-0 display-6 fs-4'
                              >
                                <strong>Edit card</strong>
                              </h5>
                            </div>
                            <div className='modal-body'>
                              <form id='newCardForm' action=''>
                                <div className='mb-3'>
                                  <label>Image</label>
                                  <input
                                    className='form-control form-floating'
                                    type='file'
                                    id='img'
                                    accept='image/png, image/jpg, image/jpeg'
                                  ></input>
                                </div>

                                <div className='form-floating mb-3'>
                                  <input
                                    type='title'
                                    className='form-control'
                                    id='title'
                                    placeholder='New title'
                                    defaultValue={title}
                                  ></input>
                                  <label>Title</label>
                                </div>

                                <div className='form-floating mb-3'>
                                  <input
                                    type='author'
                                    className='form-control'
                                    id='author'
                                    placeholder='New title'
                                    defaultValue={author}
                                  ></input>
                                  <label>Author</label>
                                </div>

                                <div className='form-floating mb-3'>
                                  <textarea
                                    type='desc'
                                    className='form-control'
                                    placeholder='New description'
                                    defaultValue={desc}
                                    id='desc'
                                    style={{ maxHeight: '25ch' }}
                                  ></textarea>
                                  <label>Description</label>
                                </div>

                                <div className='form-check mb-3'>
                                  <input
                                    className='form-check-input'
                                    type='checkbox'
                                    id='full'
                                    defaultChecked={full ? 'true' : 'false'}
                                  ></input>
                                  <label className='form-check-label'>
                                    Full
                                  </label>
                                </div>
                              </form>
                            </div>
                            <div className='modal-footer'>
                              <button
                                type='button'
                                className='btn btn-secondary'
                                data-bs-dismiss='modal'
                              >
                                <strong>Discard changes</strong>
                              </button>
                              <Link href='/cards'>
                                <button
                                  type='submit'
                                  className='btn btn-primary'
                                  data-bs-dismiss='modal'
                                  onClick={() => updateCard(props)}
                                >
                                  <strong>Save changes</strong>
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        type='button'
                        className='btn m-0 p-0 px-2'
                        title='Delete card'
                      >
                        <a
                          id='deleteCard'
                          className='text-secondary'
                          onClick={() => deleteCard(props.id)}
                        >
                          <i className='bi bi-trash-fill'></i>
                        </a>
                      </button>
                    </div>
                  </div>
                </div>
                <p className='card-text'>
                  <i>{author}</i>
                </p>
                <p className='card-text' style={{ minHeight: '10ch' }}>
                  {desc}
                </p>
              </div>

              <div className='card-footer d-flex justify-content-between bg-transparent'>
                <p className='card-text m-0'>
                  <small className='me-2'>
                    <i className='bi bi-clock'></i>
                  </small>
                  <small className='text-muted'>
                    Last updated {time.toLocaleDateString()} at {time.toLocaleTimeString()}
                  </small>
                </p>

                <p className='card-text m-0'>
                  <small className='me-2'>
                    {full ? (
                      <i className='bi bi-people-fill'></i>
                    ) : (
                      <i className='bi bi-person-plus-fill'></i>
                    )}
                  </small>
                  <small className='text-muted'>
                    <strong>{full ? 'Closed.' : 'Open!'}</strong>
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
