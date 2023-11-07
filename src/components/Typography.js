export const LbTitle = ({ children, className, ...rest }) => {
  return (
    <div>
      <div className='py-4 mx-auto w-fit'>
        <span className={className ? className : 'lb-title-font lb-text-shadow text-white text-5xl sm:text-6xl lg:text-7xl'} {...rest}>
          {children}
        </span>
      </div>
      <div className="mx-auto w-fit">
        <img alt="" src='/img/section-title-image-1.png' />
      </div>
    </div>
  );
}

export const LbSubTitle = ({ children, className, ...rest }) => {
  return (
    <div className="py-4">
      <span className={'lb-title-font lb-text-shadow flex text-white text-lg sm:text-xl lg:text-2xl ' + className} {...rest}>
        <div className="w-2 -skew-x-12 lb-color-sel"></div>&nbsp;&nbsp;{children}
      </span>
    </div>
  );
}

export const LbParagraph = ({ children, className, ...rest }) => {
  return (
    <div className={"lb-text-font text-white text-sm md:text-base lg:text-lg xl:text-xl h-fit w-fit my-3 " + className} {...rest}>
      {children}
    </div>
  );
}

                    