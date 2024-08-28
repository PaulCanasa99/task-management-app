import { useState } from "react";
import { Avatar, Image, Input } from "@nextui-org/react";
import { LazyQueryExecFunction, OperationVariables } from "@apollo/client";
import search from "../assets/search.svg"
import bell from "../assets/bell.svg"

const Navbar = ({getTasks} : {getTasks: LazyQueryExecFunction<any, OperationVariables>}) => {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      if (searchValue) 
        getTasks({variables: {input: {ownerId: '6b836ab3-a687-43f2-8c66-60dcaa528683', name: searchValue}}})
      else 
        getTasks({variables: {input: {ownerId: '6b836ab3-a687-43f2-8c66-60dcaa528683'}}})
    }
  }

  return (
    <Input
      size="lg"
      onKeyDown={handleKeyDown}
      placeholder="Search by name"
      labelPlacement="outside"
      value={searchValue}
      onChange={({target}) => setSearchValue(target.value)}
      startContent={
      <div className="pointer-events-none flex items-center">
        <Image src={search} width={20}/>
      </div>
      }
      endContent={
        <div className="pointer-events-none flex items-center gap-3">
          <Image src={bell} width={20}/>
          <Avatar size="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
        </div>
      }
    />
  )
}

export default Navbar;