import { Dialog, Transition } from '@headlessui/react';
import { Button } from 'antd';
import { Fragment, useContext, useState } from 'react';
import { ThemeContext } from '../ThemeContext';
const ModalPopUp = () => {
  const { currentTokens, setTheme } = useContext(ThemeContext);
  let [isOpen, setIsOpen] = useState(false);

  // function to change state of modal
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <div className="">
        <Button
          type="primary"
          onClick={() => {
           
            
            openModal();
          }}
        >
          Set Custom Theme
        </Button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="z-50 w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Personalize Site Color Scheme
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Customize Background Color, Text Color and much more</p>
                    <label className="block text-sm font-medium text-gray-700 mt-4">Background Color</label>
                    <input
                      type="color"
                      id="favcolor"
                      name="favcolor"
                      value={currentTokens.hardCodedTokens.backgroundColor}
                      onChange={(e)=>{
                        
                      setTheme({
                        colorBgBase: e.target.value,
                        colorTextBase: currentTokens.hardCodedTokens.textColor
                      },"custom")
                      }}
                    />
                    {/* now text color */}
                    <label className="block text-sm font-medium text-gray-700 mt-4">Text Color</label>
                    <input type="color" id="favcolor" name="favcolor" value={currentTokens.hardCodedTokens.textColor} onChange={
                      (e)=>{
                        setTheme({
                          colorBgBase: currentTokens.hardCodedTokens.backgroundColor,
                          colorTextBase: e.target.value
                        }, "custom")
                      }
                    }/>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 hover:cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Apply
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ModalPopUp;
