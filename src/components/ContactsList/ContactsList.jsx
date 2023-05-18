import { useDispatch } from 'react-redux';
import { deleteContact, fetchContacts } from '../../redux/operations';
import { useSelector } from 'react-redux';
import { selectContacts, selectFilter } from 'redux/selectors';
import { useEffect } from 'react';

const ContactsList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  const dispatch = useDispatch();

  const normalizeFilter = filter?.toLocaleLowerCase();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filterContacts = contacts.filter(fil => {
    return fil.name.toLocaleLowerCase().includes(normalizeFilter);
  });

  const deleteCon = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <div>
      {filterContacts.length === 0 || (
        <ul>
          {filterContacts.map(({ id, name, number }) => {
            return (
              <li key={id} className="contact-unit">
                <p>
                  {name}: {number}
                </p>
                <button
                  type="button"
                  onClick={() => deleteCon(id)}
                  className="delete-contact"
                >
                  Удалить контакт
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ContactsList;
