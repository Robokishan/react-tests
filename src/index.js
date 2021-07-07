import React, {useState, useRef, useEffect} from 'react'
import ReactDOM from 'react-dom'
import './style.scss'
import axios from 'axios'

function App() {
  const [logs, setLogs] = useState('')
  const [logsList, setLogsList] = useState([])
  const logsRef = useRef(null)
  const logsRefList = useRef(null)
  var [scrollLog, setScrollLog] = useState({scrollLog: true})

  function Clear(e) {
    setLogs('')
    setLogsList([])
  }

  function scrollToMyRef() {
    /* Scroll to only div and page will stay there */
    const scroll =
      logsRefList.current.scrollHeight - logsRefList.current.clientHeight
    logsRefList.current.scrollTo({
      top: scroll,
      behavior: 'smooth',
    })

    return scroll

    /* Scroll to bottom of div */
    // logsRefList.current.scrollIntoView({
    //   block: 'end',
    //   behavior: 'smooth',
    // })
  }

  async function generateLogs(e) {
    let cmd_response =
      'br-d2a5f393d6b3: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n        inet 172.19.0.1  netmask 255.255.0.0  broadcast 172.19.255.255\n        inet6 fe80::42:f3ff:fe4c:f3c2  prefixlen 64  scopeid 0x20<link>\n        ether 02:42:f3:4c:f3:c2  txqueuelen 0  (Ethernet)\n        RX packets 671873  bytes 96901267 (92.4 MiB)\n        RX errors 0  dropped 0  overruns 0  frame 0\n        TX packets 530141  bytes 319673894 (304.8 MiB)\n        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0\n\ndocker0: flags=4099<UP,BROADCAST,MULTICAST>  mtu 1500\n        inet 172.17.0.1  netmask 255.255.0.0  broadcast 172.17.255.255\n        ether 02:42:b4:9d:89:44  txqueuelen 0  (Ethernet)\n        RX packets 0  bytes 0 (0.0 B)\n        RX errors 0  dropped 0  overruns 0  frame 0\n        TX packets 0  bytes 0 (0.0 B)\n        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0\n\neth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n        inet 192.168.0.123  netmask 255.255.255.0  broadcast 192.168.0.255\n        inet6 fe80::7bdb:33c9:d3bc:2bd2  prefixlen 64  scopeid 0x20<link>\n        ether dc:a6:32:fe:7e:0b  txqueuelen 1000  (Ethernet)\n        RX packets 786080  bytes 427270635 (407.4 MiB)\n        RX errors 0  dropped 0  overruns 0  frame 10578\n        TX packets 748868  bytes 116180711 (110.7 MiB)\n        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0\n\nhotspot: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n        inet 192.168.45.1  netmask 255.255.255.0  broadcast 192.168.45.255\n        inet6 fe80::dea6:32ff:fefe:7e0c  prefixlen 64  scopeid 0x20<link>\n        ether dc:a6:32:fe:7e:0c  txqueuelen 1000  (Ethernet)\n        RX packets 0  bytes 0 (0.0 B)\n        RX errors 0  dropped 0  overruns 0  frame 0\n        TX packets 45  bytes 5908 (5.7 KiB)\n        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0\n\nlo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536\n        inet 127.0.0.1  netmask 255.0.0.0\n        inet6 ::1  prefixlen 128  scopeid 0x10<host>\n        loop  txqueuelen 1000  (Local Loopback)\n        RX packets 53063  bytes 22961549 (21.8 MiB)\n        RX errors 0  dropped 0  overruns 0  frame 0\n        TX packets 53063  bytes 22961549 (21.8 MiB)\n        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0\n\nveth28adb49: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n        inet6 fe80::e099:52ff:fe6b:327a  prefixlen 64  scopeid 0x20<link>\n        ether e2:99:52:6b:32:7a  txqueuelen 0  (Ethernet)\n        RX packets 50365  bytes 5085273 (4.8 MiB)\n        RX errors 0  dropped 0  overruns 0  frame 0\n        TX packets 26933  bytes 2035285 (1.9 MiB)\n        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0\n\nveth2ac817e: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n        inet6 fe80::80b:b1ff:fe00:e210  prefixlen 64  scopeid 0x20<link>\n        ether 0a:0b:b1:00:e2:10  txqueuelen 0  (Ethernet)\n        RX packets 3841  bytes 458259 (447.5 KiB)\n        RX errors 0  dropped 0  overruns 0  frame 0\n        TX packets 4741  bytes 423330 (413.4 KiB)\n        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0\n\nvethb542fde: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n        inet6 fe80::24b7:1eff:feaa:1fa5  prefixlen 64  scopeid 0x20<link>\n        ether 26:b7:1e:aa:1f:a5  txqueuelen 0  (Ethernet)\n        RX packets 24210  bytes 1732978 (1.6 MiB)\n        RX errors 0  dropped 0  overruns 0  frame 0\n        TX packets 19042  bytes 2085839 (1.9 MiB)\n        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0\n\nvethd6b3354: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n        inet6 fe80::3445:caff:fed6:a530  prefixlen 64  scopeid 0x20<link>\n        ether 36:45:ca:d6:a5:30  txqueuelen 0  (Ethernet)\n        RX packets 567345  bytes 94360468 (89.9 MiB)\n        RX errors 0  dropped 0  overruns 0  frame 0\n        TX packets 433332  bytes 292181032 (278.6 MiB)\n        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0\n\nvethe3f8f5e: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n        inet6 fe80::746f:30ff:fe4e:afc2  prefixlen 64  scopeid 0x20<link>\n        ether 76:6f:30:4e:af:c2  txqueuelen 0  (Ethernet)\n        RX packets 0  bytes 0 (0.0 B)\n        RX errors 0  dropped 0  overruns 0  frame 0\n        TX packets 55  bytes 4144 (4.0 KiB)\n        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0\n\nvethec15298: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n        inet6 fe80::74ae:38ff:fe3f:745e  prefixlen 64  scopeid 0x20<link>\n        ether 76:ae:38:3f:74:5e  txqueuelen 0  (Ethernet)\n        RX packets 118220  bytes 8162943 (7.7 MiB)\n        RX errors 0  dropped 0  overruns 0  frame 0\n        TX packets 178669  bytes 34749354 (33.1 MiB)\n        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0\n\nvethfc3001a: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n        inet6 fe80::ecac:12ff:fedf:cc1e  prefixlen 64  scopeid 0x20<link>\n        ether ee:ac:12:df:cc:1e  txqueuelen 0  (Ethernet)\n        RX packets 737  bytes 4870870 (4.6 MiB)\n        RX errors 0  dropped 0  overruns 0  frame 0\n        TX packets 943  bytes 319460 (311.9 KiB)\n        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0\n\nwlan0: flags=4099<UP,BROADCAST,MULTICAST>  mtu 1500\n        ether dc:a6:32:fe:7e:0c  txqueuelen 1000  (Ethernet)\n        RX packets 0  bytes 0 (0.0 B)\n        RX errors 0  dropped 0  overruns 0  frame 0\n        TX packets 0  bytes 0 (0.0 B)\n        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0\n\nwwan0: flags=4305<UP,POINTOPOINT,RUNNING,NOARP,MULTICAST>  mtu 1500\n        inet 25.254.6.126  netmask 255.255.255.252  destination 25.254.6.126\n        inet6 fe80::5f:c90e:c94e:8f3a  prefixlen 64  scopeid 0x20<link>\n        unspec 00-00-00-00-00-00-00-00-00-00-00-00-00-00-00-00  txqueuelen 1000  (UNSPEC)\n        RX packets 17267  bytes 1167050 (1.1 MiB)\n        RX errors 0  dropped 0  overruns 0  frame 0\n        TX packets 33686  bytes 1867587 (1.7 MiB)\n        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0\n\n'

    let cmdList = cmd_response.split('\n')
    let _logsList = logsList
    Array.prototype.push.apply(_logsList, cmdList)
    setLogsList((_logsList) => [..._logsList])
  }

  useEffect(() => {
    if (scrollLog.scrollLog) {
      scrollToMyRef()
    }
  }, [logs, logsList, scrollLog])

  return (
    <div>
      <div className="header">
        <div className="container">
          <div className="item logo">Portfolio</div>
          <div className="item navcontainer">
            <div className="nav-item">About</div>
            <div className="nav-item">Contact</div>
            <div className="nav-item">Resume</div>
            <div className="nav-item">Begin</div>
            <div className="nav-item">Future</div>
            <div className="nav-item">Testimonals</div>
          </div>
        </div>
      </div>
      <div className="button">
        <button onClick={generateLogs}> Get Users </button>
        <button onClick={Clear}> Clear </button>
        <input
          type="checkbox"
          checked={scrollLog.scrollLog}
          onChange={() => setScrollLog({scrollLog: !scrollLog.scrollLog})}
        ></input>
      </div>
      <div className="terminal">
        <div ref={logsRef} id="logs" className="content">
          <div className="logs">
            <span>{logs}</span>
          </div>
        </div>
      </div>
      <div ref={logsRefList} className="terminalList">
        <div className="content">
          {logsList.map((item, i) => (
            <div className="group" key={`${i}_parent_span`}>
              <a className="link" key={`${i}_a`}>
                {i + 1}
              </a>
              <span className="cmd" key={`${i}_span`}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="introduction flex">
        <div className="container">
          <div className="item">
            <img src="https://picsum.photos/200/300" alt="Girl in a jacket" />
          </div>
          <div className="item">
            <h1> Flexbox </h1>
            <h2> This is built using css flexbox</h2>
            <button> Go to bottom </button>
          </div>
        </div>
      </div>

      <div className="introduction grid">
        <div className="container">
          <div className="item">
            <img src="https://picsum.photos/200/300" alt="Girl in a jacket" />
          </div>
          <div className="item">
            <h1> Grid </h1>
            <h2> this is built using grid of css</h2>
            <button> Go to bottom </button>
          </div>
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
