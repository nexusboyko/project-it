import React from 'react';

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
  const { img, title, desc, author, full, date } = props;

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
                  <div className='dropdown'>
                    <a
                      href='#'
                      role='button'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'
                      className='text-secondary'
                    >
                      <i className='bi bi-gear-fill'></i>
                    </a>

                    <ul className='dropdown-menu'>
                      <li>
                        <a id='editCard' className='dropdown-item' href='#'>
                          Edit
                        </a>
                      </li>
                      <li>
                        <a
                          id='deleteCard'
                          className='dropdown-item'
                          href='#'
                          onClick={() => deleteCard(props.id)}
                        >
                          Delete
                        </a>
                      </li>
                    </ul>
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
                    Last updated {date.toLocaleString()}
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
