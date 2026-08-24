import { AppBar } from "@/components/ui/appbar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item"
import { Spinner } from "@/components/ui/spinner"
import { useAuth } from "@/contexts/auth-context"
import { useDialogs } from "@/lib/dialogs"
import { useAcceptFriendship, useFriendships, useRemoveFriendship, useRequestFriendship, useUserSearch } from "@/tanstack/friendship"
import { Trash2, UserPlus } from "lucide-react"
import { useState } from "react"

export const FriendsPage = () => {
  const { user, profile } = useAuth()

  const dialogs = useDialogs();

  const [searchValue, setSearchValue] = useState("")
  const [submittedSearch, setSubmittedSearch] = useState("")

  const { data: friendships = [] } = useFriendships(user?.id)

  const removeFrienship = useRemoveFriendship()
  const acceptFriendship = useAcceptFriendship()
  const requestFriendship = useRequestFriendship(user?.id)

  const { data: searchResults = [], isFetching } = useUserSearch(submittedSearch)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmittedSearch(searchValue.trim())
  }

  return (
    <div className="flex flex-col h-screen">
      <AppBar
        className='!border-b !shadow-sm'
        title="Freunde"
        user={profile!}
      />
      <main className='flex-1 size-full pb-safe-bottom'>
        <div className="px-4 pb-2 pt-4">
          <form onSubmit={handleSearch}>
            <Field orientation="horizontal">
              <Input
                type="search"
                placeholder="Suche eine Person..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Button type="submit" disabled={isFetching}>
                {isFetching ? <Spinner /> : "Suche"}
              </Button>
            </Field>
          </form>
        </div>

        {
          searchResults?.length > 0 && <div key={"search"} className={"gap-2 flex-col mx-4"}>
            {
              searchResults.map(x => (
                <Item variant="outline">
                  <ItemContent>
                    <ItemTitle>{x.display_name}</ItemTitle>
                    <ItemDescription>{x.username}</ItemDescription>

                  </ItemContent>
                  {
                    !friendships.some(y => y.friend?.id === x.id) && <ItemActions >
                      <Button onClick={() => requestFriendship.mutate(x.id)}>
                        <UserPlus />
                        Anfragen
                      </Button>
                    </ItemActions>
                  }
                </Item>
              ))
            }
          </div>
        }

        {
          friendships.filter(x => x.status === "pending").length > 0 && <div key={"Pending"} className={"gap-2 flex-col m-4"}>
            <div className="text-sm font-semibold">
              Anfragen
            </div>

            {
              friendships.filter(x => x.status === "pending").map(friendship => (
                <Item variant="outline" className="my-2">
                  <ItemContent >
                    <ItemTitle>
                      {friendship.friend?.display_name}
                      <Badge variant="outline" color={friendship.isIncomingRequest ? "green" : "warning"}>
                        {
                          friendship.isIncomingRequest ? "Empfangen" : "Ausstehend"
                        }
                      </Badge>
                    </ItemTitle>
                  </ItemContent>
                  <ItemActions>
                    <div className="flex items-center gap-2">
                      {
                        friendship.isIncomingRequest && <Button onClick={() => {
                          acceptFriendship.mutate(friendship.friendshipId)
                        }}>
                          Akzeptieren
                        </Button>
                      }
                      <Button variant={"destructive"} onClick={() => {
                        dialogs.confirm("Möchtest du diese Freundschaft wirklich löschen?").then(result => {
                          if (result) {
                            removeFrienship.mutate(friendship.friendshipId)
                          }
                        })
                      }}>
                        <Trash2 />
                      </Button>
                    </div>
                  </ItemActions>
                </Item>
              ))
            }
          </div>
        }

        {
          friendships.filter(x => x.status === "accepted").length > 0 && <div key={"Friends"} className={"flex gap-2 flex-col p-4"}>
            <div className="text-sm font-semibold">
              Aktive Freunde
            </div>

            {
              friendships.filter(x => x.status === "accepted").map(friendship => (
                <Item variant="outline" >
                  <ItemContent>
                    <ItemTitle>
                      {friendship.friend?.display_name}
                    </ItemTitle>
                  </ItemContent>
                  <ItemActions>
                    <Button variant={"destructive"} onClick={() => {
                      dialogs.confirm("Möchtest du diese Freundschaft wirklich löschen?").then(result => {
                        if (result) {
                          removeFrienship.mutate(friendship.friendshipId)
                        }
                      })
                    }}>
                      <Trash2 />
                    </Button>
                  </ItemActions>
                </Item>
              ))
            }
          </div>
        }

      </main>
    </div>
  )
}