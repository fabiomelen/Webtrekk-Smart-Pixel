defmodule ServerWeb.AppController do
  use ServerWeb, :controller

  def index(conn, %{"app" => app}) do
    conn
    |> put_resp_header("content-type", "text/html; charset=utf-8")
    |> Plug.Conn.send_file(200, "priv/apps/#{app}/index.html")
    |> halt()
  end
end
