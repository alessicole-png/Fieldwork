import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Home as HomeIcon, Calendar, Users, ClipboardList, FileText, Plus, X, Check, Pencil, Trash2, Search, ChevronLeft, ChevronRight, Mic, Square, Lock, MapPin, Phone, Send, Copy, Bot, Table2 } from "lucide-react";

const LOGO="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAAZm0lEQVR42u2cebTeZX3gP9/n+S3veteshJDkZjFAgKCEHRFBBFzQWpQR0Sq2HT3OdDp11HoGT9vp6Zyeae2xlZmxzsxRAT1qPcWKikVQkkiAAAkhISu52ZN7b+72br/1eZ754/deoNr5o6SEeOY+57zn3OVdP7/vvrwyNjbmmD2v+qhZBLMAZwHOApwFOHtmAc4CnAU4C3D2zAL8/xig+3/+ckYf7/S8jACCOIsTweJ3/5IhLgMFVgO5Q5yPUiHgsDYFJQVSAXEvX3NxIFhc8cw4HNJF74qHYOWXpMUV70W57nMJWNxL9z+DASqcU2gsxmkMZRCLjyVQGanOSJQQWodnPIwNUaR44rAIVgSHYAFxgkKhXAEMQEQKmXUWxGEdGCkeZ+TlS+gZUF2Ani1gZ9qckryfHoCSImKxLkAcaGkiYsE5IuvhrCYURQCIKDIijEsQcqwTnCgQhRKNIIgrIIHDAkYXCHzj0LagJbiuxL1sEKwCrCNTYKSAauXXQoVzkIycAI3BlxY4sBJiVAXfaYIsIzJgJSWoJOAJxrjiEzqLcwqLoZBj1VU/MKp7F+dABKdeqbIzEG1xHwGrC+iFSRB8q7qm4UwG6HShbpJhxHXVz8c5hfEiVGoBDfVeJBDEjUEmaFsGBCddcUEhzmKtRVAoAWXBicM6ARFyUShXwBPnUDN2UhzWOQwOlGCVQ6x0QaozG6CyIYICnSKS4dAY0eQCkhtKVYXVbY409jNy9AR6OsJGFu0CSuUK1WqNSrmHICzj+SVCL0BwaDQahc4LqUo8Ra66ooZDY6FrLzEgAko5rHGoGVV3vw4q7ALElFGqVdgcp0h1jguFiuezbe9mntq7noYbYdGCFSztv5yFi+dR9TVae3hKI1aR52CdI3MWTzSeEzSCh+Ac5E5hrRQevuuxC+/sAPcSSM8VLtkKXRt7hgO0YrGSoUVhUo2lRKU3Zri1nQce+jYnx1tcd9nNXLrqQlQp5DARhydbhGlIKdX4iWHAr9EX1AjwQGmsA2sdiXJkvmC7DqQEuK5Xzo3B0wq0hzF5EQBJF7At1BqRM18CLRlBySPNIlKJqM6vsnH7IzzwyH2cu2YFt/7GhwlZxvMv7GHf8E6SumGw7ywGw7n4YZXQeCR5RjOL8LWPXy4jqmu/rCnCEq3Jo5ieWi/NTgs8RaVWotOJMAgowRQKXSi264Y+mFMLME5PU0lw1mKJUXNjfrDtW/zdw//Ae958Ox+59E4eG97L9/dtppyXuHbFOtactYw6Gs85lAg4SK0jwRGLITIpytN4OMLMUsmhpDxiVcR9FkueW6x1eLqQWCWCcwo1o69O0F0nU/jzM1gCMy8jpcNgj+KHTzzANzfez0du+RjXn/8+7nluAzu37OKmi6/ikouuQaUKm0wTpQm+cXgGfKcIRXDk2AB0vUzHt6SiiLCccB2ypI3R4Jyl5peoSEDVlfDxyFsp5BbtwKG6nh1yAd+CnNEqLJARo3oznj+8jYc3PcyV667nLeffwnc3PMSPjhzg07d9gsuZRzKSkJOBbqO0j/LLBMZhohSxlqASYCuKw6bJ1rFhdp88yuHmCCeiCaIkwiqo+iHVBFb2L6SnLazoWcBbLrycIBd868BpQBeSKqf+8V5zgM45Qp3TNmPc98jfk1X7+Ohb/oCHdj7LT3dv5Q9v+xRLqnM5MhnR6xvmiqBajjiAjs5pm5zcs3i9FY6YBhte3MbD+7dwIJ9kRFp0VIZxOSr0MCWHiWIGCNm57wCLOwFLr3wnoi2esQSmyIcdghHpBuH2dAOUbkLvurbDvPR3capI7K0gWhWBq00Jqopnn9/E8Ind/OYHP8GeVpNvbXiU9159KxeXVtIZ7ZCFObnOaScZfYGHT05FhBhH3hvyvBvhf235IY8f2oEteTS8BFtViGfJcwdawIfQZAyUoDQyxW9edztvW309TGRd25eDGMDilCo8susG6qevnFW8KN3ahxOHU7aItaxDWYVYQYnCWov2fUaicR7Z+iiL5gxw4ZI1fGvbT6mGg9y46lr0mNCTKfqUQ5wi0h6TNsUqSx53EBHGVcJfP/5dvju6idElirhi0AHYNMIzGdVyGS0+fmQYNJbw4G7etWKId6++BG8S/LiOc2VypciUJdOOTBkyZbDq1Hzov0490BWGWUSB0ogWjM0xpIRVzQsj29nR3MUV695Oa1rYsW0bt111A3MzQQVNJMzwMyHslCindXr8HrKsRhLMpVkr8/1dm9g0NYw3b5DMwmSUUVGDvOGcddQWnksSe/hxTtW0qUQt5gf9vP2id6A7IZLnaJ2BZN336oPzcc4H550yAu9fLn+2G+U7nHKFVxNw3VzUYXHkGHLQhoyIF4/toOOmWbp4iDzp8L5b3sTCgRZHJtejKpBbx5zqYipuEdFYROB5WAnpaMcRN84/7PoZSd1SSixZM2L1yjXMH1zErgOHGJ06ga6HhHmDPjONNzHFmy+6lYW9y0lHoew7nEQ4HM5pBF04EumaIOdehzDmVwyv6iaWitya4v+eQXmGdtLk+KFhlvQPUK9otu96mqcPf5sdeYt4bJJmVbFw4GzmmgWcv+itXLHqJqr+IloTTeoDPTy+bxMn3QiSwzLTz01XvYsj+RQ/2rKBaa3QvVWy9nE8N065fZKlfi/XDF1DJR6gVgrJ02lEg3WqkLxuEUM5h8UUdvG0OhFX1NoQ171uRfLuUDgnCAIKcslxKiWOm7THI/oXLsEF/QQL5pO/oDieHKE8kNFxHocaezg4uZ3njm3n53t/xnvefCeXDFxCJ8k4MHEM2zRcs/BCbrzoBp7dvY3HDj5BUteIDyaOKamMfqeoTqa847IbWF5fQTgdoHMhyRJKpRJxJohotFWFFnVz5FONZF6lAXC/Uq7v6jGiFKIF63KMyzCS44zFV2WGozbPHBzj5uvvQkmdVDlKyqOvVmbgLB8zMM6u1ka+s/6vOd7ZgwosrfEOb5p/Hr991fvZcXA/D+56krhWJi9rnErxvJhBDep4g3XzL+amc28ibPjQMpBllMshcZIDIc56OLGIpCBp1y7aM8CJzDyZLp4uzzNwFIk8jtxN4kqjJEHO5p0HmGiHrFr1Rmwzo2Ri8vYEc/sHWHr2POb3eEwe2sHTWx+nkzou6lnGv7/lt9i890nuP/AAU0OWiXJMbiMC7RgkIzwxygrp5wNXfZC+fCFeR1HC4ekMaywiJZwNuxc6B4lA4q76vi4A5ZeksbhZ53DO4mkfQeOcB0bhPEsnm2aODFLx57H9yCiXXvgewmwexga0sTw3fJDUeFx32U2snLuKZ555kjxvcMeV72S80eR7ux/HK0HVTdLvnaRPjjAYH6R3/zBrkn4++bZPsby+FtMMKCkfX1ucy7B4WBeAeF2V7UqeZP+MLT8dNrDrcZ0TRCyuaw/FFV0aZy2eeIhRaBvgS5VytYfDraNIZphb6udI5wSL6rdwzbkf4wfbv4aaayjNS9lz6Cil1kHec8NtPLthJ83xYwxWFvHYc1s52YF5ieAdHwPdREopQSfjtuU38u4L7qQ/uADdKUMeo7QBMWQWrARY5xVRq8oQZxDnwP3rKJ/3quO+f1LKtd04sOiYiRHEaCTXVMN++uadw1PHn2aqc4ALVs5hy9bNHD3Z4eZLP87hE8O8MPWPJHlEUE7ZduwX1EqKj7/3D1HNIfY0p3hh93NcN7SQW99wLf50kyONSQYHB1k1bznnhHOomAHyyGJMiiUndzlKHE55GBdgBbRKEJN2w7Cw+xm80w+wiPsUThw4i4gBVxQptQMnCpuDpgTGUC7VWXTWStr7cg4f2sbqN1xP/kST7cO7uHLde/nEOz7LT56cx9ajP6eZptgybHluN8MLj7Bu6BIe27+Jc3oq/N41H2S530PWG2MqZVSiCFOPvGFIbAKllNhEhJ7QyWMCKSFeldx5iM5BOiA5OI1zZZybKfjn3Ybp61lMEAuuKJ8rhMzkeIFHmjtsIpx3zhqW9y9j65ZHOfeCtay78Dx+8fx6rj73PN7kLeauyz7Pkak7mEo6hD1ltu3axM7tu7l0+QQ2PsINQ+dygTqbI4emKffPI2+2CJKMUAe41OHVyrSDiMnpk8wf6CeKIywh1bBCniT4ocO5pKgkGA9cCLYL1plTqmepVxPCOJlxHEVeLFYVjW9nMZIXYQwWJYosSVg5ZxUXn72Woyd3s3vPBm4+9zIaUcKDW5+m7RtOtlsMzl3KOfOXsby6lA+svYMVA6sYax6nl4DzFq8mTyH0KrhM4QgwYZmGZLR0C6mlHB3fi9IJCkscJ3glTWpaVAJBJTnahogNsaKxKkWpGOWyoj/NaQZYVGBmXlh3bwqnBCsOpy0OgyiLiCPMSqxbfiXz585l45M/oS4Jb7/kWjZufpbvbH2MdE4Px6IpOklE0oqRlsfQ/PMgCxkqD1G1FabTCOUbQs/h4ZPkhoakeAtr7B05xHQzYuisZRzadxAdhIRlH+diFDEaQedlsKVuTzlDiBCJC4dyCkd/5jOf+aPXtJ4qijQ3LFqwiEZzhB3Dz3Ooc5R/85YP0BzLuXffM8RVj6sXrqHHLqTTtERhQljrxU+rLKucTY8uobQhtjE2TfAjR7VSIRio8cyBF9m5f4zLL347R4aHyeIWS5cOkcQpvvYxxqLFn2kswEvZx4wmqVNS4dMAULC5I3AVFs9dzd6jwzw//jhJNspN191IMw358U8fZjQdoTZ3HnPmL6DqldGxpuzKZA5aqQHtobwAAo3XV6KpEh7duJ7x8Uneef3NHD62lyP793Dlm9YRRwlii16KEo2nPYyx3Qacewmm6zbrz2iAAJ54ZLGjroc4Z/kydoz9lE071wMTfPSK21kwZwEP7t/AL/Y8QTvqUM17qAdlqvN6adR8XK0OpQptaxhJp/j53if4yZOPcPb8+dzypivYtWsDLwxv4Kp1l1ORGp12h1JY7pYsVXfswxZ5epHMdy9uETWc2V05AWeTYiLAVslrLXZ0fsx9m+5hx4FtXDjnjdx0/e9S6V3D00/t5NkXdjNWMYT1Ev2VOvPqc6n7Ie1Gg2Q6RjUNa5Ys46oLzqfem/D4pp8wPT7Cu657D3V1NklDqNd6iKOUIAjAQpZZtOch1ryiIuJeDsvO+LamshgMnpTI0oiwJ2FYNvPA5m+wZeuz+GaA81Zcy1uveiu2p84TjDB2MqJzok2P+ChyKkHA8qEhlgZnUe1Y9u/fzrYtT3HO4rN4x9U348chJgkI/TpJnBEEIXlucMYShmWyLEe9sgjSjSR+LQDm4pMT4FtLKdOUMkVeHqXTO8Yvjm/l51seZfe+J8kqR1iwaAHnL76ONfVLmRMuIvEjYhfhUstY6ygvjuxiZHSEBaXlXH/xbaxddA1ZI8W6CNGQm2ICQikPYxxKdS3eL3nbGYfyawHQtxkehsQrY/IKfqcMfou0Oklc7RC5NsdHD7Hl8Hr27nuO9tExXNZNwzRo5VMuVZnft5CF84ZYs+YSVixejZf4JJOGit+LeCHOxjiX46xFRKG1xlqLcw75ZxtHDk6xInhaANZsh5KLOCkhseonpBerElLGwTWpeDW07mHaM6SMoZNhJpJxTkYdtA3oq86h5NXpCRfQX1lE3vHI0wiRDqJSTO5h0oDAU2gtWFuMwCmlXgKo1GszDn5aAHomx7cGqzwSLyDxNBiHsgm+n2IjB3mNJOxHeSl1TiCeJXXdIq0OcMojzg15mqCMoexXSFNQBFRCD5cnxJkBz0OJwjnTHWfTL/WnX5PP9poPJojQEUUuUFUe5Bkm6+Apn5L2cbEp8qFQKOcJJjN0vBCVWbRTaKVIjcE5R+B5hKJwkqOsRzUsk6Q5nU6Ep3I8v1RMbbliJsYagzGmW+g9dXV9bQBKt7FFdwpeXi74KyB3FikFlKtlbDshtB59QQ9ZnBF1YkphGa8e0IqbVJSlVOvheFIiyyLKpYAkydEoxCjKqoRSPhL6pFlClLSo1kqkeYCVonjQmG4S+D5hKSCKO1hjURQDR4h+qfrm1MtIT/uI78zKgZNiWNt0u4T1XMiynKTiUTEKohRX0njW8bW//BIP/+Qf8bXHpWvfyKd+9xP0zx3k0PgoX7z7zzm4fSdZqLj53bfy8Y/9NrsODvMf/ut/4cMf+S1uvP5tTE9N8Z//6G727x+m0Wxx7vnn8vm7/5BPf/pu3nDeudxx5538wWf/E8N79pG1I37n332St73jZtLJBqVymcw4Uq8AFjrIgFwVw0WvS0/klVOd4rq1QAee8pDMYtOcIAioVSp85Z7/zt/8xV9x9RVXctU1V/O/7/0af/6lL5KI5T9+7tP8bP163nXrezlv7cX88Z/9Gd+6915CT7N+/UbSJCUsl2jFHTZveZraQJ3f+cTHueXdNzPdbPDDhx5i3bp1/PhHP+S+r3+dO+74IJdfcRn333sv7alpapUqcSfCe2l2+qUJYLR7nVRYuZcnmzxXjJsIEGOoBiG9nZSWSUl6fBrHTvDN++7nto/eyRf+9E+YbExz+XXXkmc5D218jCc2PM5f/M2XuP19t6GAdqfDV7/zTVavW8vA4ABplmKMxfcDwkqZoBSCFnp6e1GiuPvuu7n4jW9k3759lPyAZzc/zfvefxu//3u/T8nzaXc6hLUqeZJS6g6Vp7oYTtfmny7mnBYJFAfaFm9gpiw4s/UTK0eLHPE1Ui8RVzSJhtTkzJs7F2eKadI3X3kVN153HVG7Tc0LmT84hymbkUYxq5cOMTU5wfjoGH3VOjovVhVUblGp4fC+YR749t/x1IbHWbl0GR/6wO1EUw1+49b38tWvfJXd+/by/g9/iHv+9n8QZylBrUwziTBekYdYodgTUb+qSadNheUVxnfGFlrAD3wyZ2ljSLA0Om1KvXVWrV7FQz/8EQde3M/4yCj/9mN38fnPf561q8+n5Af84Ht/T3t8ggN7X+Tb93+LKy9Zx7LFS2hMTqO1BqEY93CWG2+4gW98837uuusuJkbHaExM0let88SGjezc+QL/5xtf5/YP3cF/+9JfMdaYAt/HasGII1fF+3SvuL0uceCM11KvaClZBShFmqUopdFa4ayjVq2x+ckn+NznPkvUbuMHAY3paf70j/+E933gdu77+tf4yy9+EeVp0k7MnLlz+J9/+xWa7Q533vlhhoaG6Ont4UN3fIgv3/NlRkdH6e/rZ/Xq1XzhC18oPG4QsOnxTXzyk59k0eKzaUcRK1et5J57vkySZhhr8bV+OVKYufgys213GgEWalDMLost1Eu6I7MzPRGTG3xRqMzgckN1oJf9I0fZvPkpfN/nwjUXsHTJEprT09T6etm9cyfPbX2OWr3ORWvXsnTJEo6PjfHU08+Q54Yo7nDZ5Zdx6PARWq0WUadNT62HK664ApOl4KBeq7F3zx6e2fwM9XqNS6+4nHpvL0mS4Ps+zGwtWQhEipUva7G+OqX5wH8xQCuOTFm0VkhmURb8brKeabC5oWoU2teIcZRzRceHhp/T19+HAqanphGlwFgkyaj09+JCj9AI01NTpBo87VMpVfB8H4Ol0WxQq9XQSqMQ0jSh3WihlcJaA8YxUO9B+T5WQafZIopidMkHEawxVHVAGsX4gY9NcgLPJ1LulOb0XxVAgy3WpZwjtILnoGMyJns88jRjmSkx5mW0lWNBrEmVo10VsnaEWEdQKXOyMcmceh/zcp8jaZNRP2e11wdpzjHXphpWKOWKJE1AK8IgxDpHp9MB56hXa4hzJJ2Ier2OMxYTJ+S+4njUYG6pRl9YoaENE60mfeUq/cYjzzPaPvSpEDvZQsrl0+uFlRMC93L6IaooDFlP8eDWx2nVA1R/jY2HdvPN7RtJ5vSwvzPB1x99kM2H9mAGqmwdPcD6/TvYdGAnSSBs3Ps839/5JI3AcnhqlJ/t3sb2E4dJKwFNz/G9Rx9iJG8T13we3PQYj21/hnYAWw7s4ZFnn6ClLdNkSE+Fw81xfvHidg5PnaTtcp7ev5sNu5/juaP7mcoiTOjTrniMmwi/p3bK00GvOozxujc1s2bhaY6dHOPoxBhjUZMdR4bZdewgh6OTRCU4mbV5/tBeIrE0TcZY2uJYZ5o4EBqkTGQdEi0cb08xbVPa2pF6HruOH2J4YoTdI0doYpi0MZWz5kG5wkinyYm4QccHU/KJnWGi2cRoxXTUxihhotPAeJpmHOE8zWSrQTuJ8MKQOI6w5nR35cR1tx8Vyjq0cXgzIUE5oCqaRVKhr6+XNYuXM5SXqeSwYulSlvbMZX6pTr+U8OOMK1esYaENqIZlamGZC8rzWFTvo9lqsKBUZ0nPHKKTk1x2wVrqOqQvKLGg3s9FQ6uoWMFPMhZW+zmr2ks5hwqawb5+psbHWTIwj8FSlflnLWRiZIyVCxazqNxLZ2qaQGkGpUQpd1g5tabSq/DChSvTSoOxeMahRZGJJekp4azFb8SoWgWDodrIcb4iqoAYAWtIk4Sevj7idodybEkDhekpoSbaaAQZrJPFKVmUUi6XcUCcp0VRVIQ8y9BQrH2JIo2SYkZWK2Is4UCdtBWhndAhx6+UUBZUM8JXHrk4vCQnEI/Yl9PrRH5ZnWeCaiuQU1R+lZ3B7PBRiECG6cZeClwxCqdE0A7y7tqB17WtubhuS1IhSmHyHOkG1DPVZXHFz2rm+xK6K2Ez34HgrCv255zFOVCqeC1ni33hV26zO3mdAM6e2e+NmQU4C3AW4CzA2TMLcBbgLMBZgLNnFuAswFmAswBnzyzA03v+L8u272LC+MwmAAAAAElFTkSuQmCC";
const SK="fieldwork-v8";
const uid=()=>Date.now().toString(36)+Math.random().toString(36).substr(2,6);
const fmt$=n=>"$"+Number(n||0).toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:0});
const fD=d=>d?new Date(d+"T12:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric"}):"";
const fDF=d=>d?new Date(d+"T12:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}):"";
const td=()=>new Date().toISOString().split("T")[0];
const dfn=d=>Math.ceil((new Date(d)-new Date(td()))/864e5);
const gcl=e=>{const s=new Date(e.date+"T"+(e.time||"09:00")),d=Number(e.estimatedHours||2),en=new Date(s.getTime()+d*36e5),f=x=>x.toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,"");return`https://calendar.google.com/calendar/render?${new URLSearchParams({action:"TEMPLATE",text:`${e.clientName} - ${(e.services||[]).join(", ")||"Job"}`,dates:`${f(s)}/${f(en)}`,details:`${e.notes||""}`,location:e.address||""})}`};
const GSHEET="https://docs.google.com/spreadsheets/d/11aZf227nbOfEYda3R2OCzVBxZydGv-y_1FGHpUIU-jA/copy";
const BUSI={name:"Cole's Landscape Co.",owner:"Cole Alessi",phone:"(248) 838-8847"};
const NW={pin:"7525",cats:[{t:"Liquid",items:[{n:"Genesis Checking",v:2866},{n:"Amex Savings",v:15000},{n:"Webull",v:15000},{n:"Fidelity",v:4800},{n:"Venmo",v:500}]},{t:"Physical",items:[{n:"Truck",v:14000},{n:"RV",v:14600},{n:"Boat+Motor",v:2500}]},{t:"Equipment",items:[{n:"Leaf Blower",v:350},{n:"Snowblower",v:400}]},{t:"Electronics",items:[{n:"MacBook",v:1000},{n:"iPhone",v:1000},{n:"Drone",v:300},{n:"Guitar",v:300}]},{t:"Outdoor",items:[{n:"Shotgun",v:600},{n:"Hunting Gear",v:500},{n:"Sunglasses",v:300},{n:"Misc",v:500}]}],gross:74516,debt:3800,net:70716};
const YR=[{y:2023,r:32716,e:15584,p:17131},{y:2024,r:42289,e:11765,p:30524},{y:2025,r:50210,e:20232,p:29978},{y:2026,r:7360,e:8847,p:-1487}];

const CL=[
  {id:"c1",name:"Michael",phone:"",address:"",notes:""},{id:"c2",name:"Kevin",phone:"",notes:"Bottles"},
  {id:"c3",name:"Pam",phone:"",notes:"John's friend"},{id:"c4",name:"Joan",phone:"",notes:"Airport"},
  {id:"c5",name:"Matt",phone:"",notes:"Recurring"},{id:"c6",name:"Matt's Mother-in-Law",phone:"",notes:""},
  {id:"c7",name:"Kelly Marsh",phone:"",notes:"Needs dirt/seed"},{id:"c8",name:"Char Marquette",phone:"",notes:"Stones+dog spot"},
  {id:"c9",name:"Valarie",phone:"",notes:""},{id:"c10",name:"Joan Heckman",phone:"",notes:"Guaranteed"},
  {id:"c11",name:"Jan & Jim",phone:"",notes:""},{id:"c12",name:"Jenna (Neighbor)",phone:"",notes:""},
  {id:"c13",name:"Kathy",phone:"",notes:""},{id:"c14",name:"Bernie",phone:"",notes:""},
  {id:"c15",name:"Pete",phone:"248-917-1422",address:"4937 Huron Dr, Clarkston MI",notes:"Bricks pending"},
  {id:"c16",name:"Emily Irvin",phone:"(734) 548-0804",address:"1350 Orchard Ridge Rd, Bloomfield Hills MI",notes:"Biggest client"},
  {id:"c17",name:"Carole",phone:"",notes:"Dock/boat+shrubs"},{id:"c18",name:"Celeste",phone:"",notes:"Surgery"},
  {id:"c19",name:"Janette",phone:"",notes:""},{id:"c20",name:"Peg",phone:"",notes:""},
  {id:"c21",name:"Gary",phone:"",notes:"Big mow"},{id:"c22",name:"Gill & Chris",phone:"",notes:"Cleanup/mulch"},
  {id:"c23",name:"Erin Lewinski",phone:"(586) 604-3655",address:"2950 Eastways Rd, Bloomfield Hills MI",notes:""},
  {id:"c24",name:"Dale",phone:"",notes:"Handyman"},{id:"c25",name:"Andrew",phone:"586-258-8932",address:"22434 Lydgate Ct, Novi MI",notes:"Trees"},
  {id:"c26",name:"Joanne Edwards",phone:"734-629-7256",address:"2360 Ford Rd, White Lake MI",notes:""},
  {id:"c27",name:"KLee Loskill",phone:"(248) 496-0315",address:"5970 Strawberry Circle",notes:"$290"},
  {id:"c28",name:"Jan",phone:"(248) 672-3719",address:"Linus Lake",notes:"~$100"},
  {id:"c29",name:"Machelle",phone:"(248) 535-0578",address:"5031 Coshocton Dr, Waterford",notes:"$250"},
  {id:"c30",name:"Veeresh Nama",phone:"(248) 207-7022",address:"3432 Paramount Ln, Auburn Hills",notes:"$400"},
  {id:"c31",name:"Ron",phone:"(248) 505-5311",address:"3644 Country View Dr",notes:""},
  {id:"c32",name:"Tyler",phone:"(517) 819-3817",notes:"Mulch+weed barrier $300"},
  {id:"c33",name:"Steve",phone:"(248) 804-6633",address:"Softwater HOA",notes:"Vine $325"},
  {id:"c34",name:"Sanjeev",phone:"(248) 252-1773",notes:""},{id:"c35",name:"Tree Bob",phone:"(248) 249-2046",notes:""},
];
const JB=[
  {id:"j1",cn:"Michael",d:"2025-03-09",sv:["Leaf Removal"],h:"2",p:"120",ex:"0",n:"Leaf blow",ps:"paid"},
  {id:"j2",cn:"Kevin",d:"2025-03-09",sv:["Debris Hauling"],h:"1.5",p:"70",ex:"0",n:"Bottles",ps:"paid"},
  {id:"j3",cn:"Pam",d:"2025-03-11",sv:["Salt"],h:"1",p:"100",ex:"0",n:"",ps:"paid"},
  {id:"j4",cn:"Joan",d:"2025-03-11",sv:[],h:"2",p:"85",ex:"15",n:"Airport. $15 gas",ps:"paid"},
  {id:"j5",cn:"Matt",d:"2025-03-23",sv:["Spring Cleanup"],h:"5",p:"350",ex:"20",n:"$20 dump",ps:"paid"},
  {id:"j6",cn:"Matt's Mother-in-Law",d:"2025-03-24",sv:["Spring Cleanup"],h:"2",p:"100",ex:"10",n:"$10 gas",ps:"paid"},
  {id:"j7",cn:"Kelly Marsh",d:"2025-03-26",sv:["Spring Cleanup"],h:"2",p:"125",ex:"25",n:"Fertilizer",ps:"paid"},
  {id:"j8",cn:"Char Marquette",d:"2025-03-26",sv:["Mulch"],h:"3",p:"250",ex:"30",n:"$30 mulch",ps:"paid"},
  {id:"j9",cn:"Valarie",d:"2025-03-30",sv:["Spring Cleanup"],h:"1.5",p:"60",ex:"0",n:"",ps:"paid"},
  {id:"j10",cn:"Joan Heckman",d:"2025-03-31",sv:[],h:"1.5",p:"75",ex:"15",n:"$15 gas",ps:"paid"},
  {id:"j11",cn:"Jan & Jim",d:"2025-03-30",sv:["Mulch"],h:"3",p:"250",ex:"100",n:"$100 mulch",ps:"paid"},
  {id:"j12",cn:"Jenna (Neighbor)",d:"2025-03-30",sv:["Spring Cleanup"],h:"1",p:"50",ex:"0",n:"",ps:"paid"},
  {id:"j13",cn:"Kathy",d:"2025-03-31",sv:["Spring Cleanup"],h:"2.5",p:"150",ex:"0",n:"PENDING",ps:"pending"},
  {id:"j14",cn:"Bernie",d:"2025-04-01",sv:["Spring Cleanup"],h:"3",p:"200",ex:"0",n:"",ps:"paid"},
  {id:"j15",cn:"Pete",d:"2025-04-01",sv:["Mulch","Cleanup"],h:"6",p:"600",ex:"346",n:"Quoted $550 paid $600. $220 mulch+$90 Rick+$10 dump+$26 lunch",ps:"paid"},
];
const SC=[
  {id:"s1",cn:"Carole",d:"2025-04-17",t:"08:00",eh:"5",sv:["Dock/Boat"],n:"Power wash boat",st:"scheduled"},
  {id:"s2",cn:"Carole",d:"2025-04-18",t:"08:00",eh:"5",sv:["Shrub Removal"],n:"Day 2",st:"scheduled"},
  {id:"s3",cn:"Janette",d:"2025-04-16",t:"09:00",eh:"3",sv:["Cleanup"],n:"",st:"scheduled"},
  {id:"s4",cn:"Peg",d:"2025-04-14",t:"09:00",eh:"3",sv:["Leaf Removal"],n:"Flower gardens",st:"scheduled"},
  {id:"s5",cn:"Emily Irvin",d:"2025-04-07",t:"07:30",eh:"11",sv:["Cleanup","Edging","Mulch"],n:"$1568. Costs ~$310+helper",st:"scheduled"},
  {id:"s6",cn:"Kelly Marsh",d:"2025-04-03",t:"10:00",eh:"1.5",sv:[],n:"Dirt & seed",st:"scheduled"},
  {id:"s7",cn:"Char Marquette",d:"2025-04-05",t:"10:00",eh:"1.5",sv:[],n:"Stones+dog spot",st:"scheduled"},
  {id:"s8",cn:"Pete",d:"2025-04-10",t:"09:00",eh:"4",sv:[],n:"Bricks & railroad ties",st:"confirmed"},
  {id:"s9",cn:"Joan Heckman",d:"2025-04-12",t:"09:00",eh:"4",sv:["Cleanup","Mulch"],n:"Guaranteed",st:"confirmed"},
  {id:"s10",cn:"Pam",d:"2025-04-12",t:"13:00",eh:"3",sv:["Cleanup"],n:"John's friend",st:"confirmed"},
  {id:"s11",cn:"Celeste",d:"2025-04-14",t:"09:00",eh:"5",sv:["Cleanup"],n:"Surgery. Front+back",st:"confirmed"},
];
const LD=[{id:"l1",cn:"Gary",sv:["Mowing","Cleanup"]},{id:"l2",cn:"Gill & Chris",sv:["Cleanup","Mulch"]},{id:"l3",cn:"Erin Lewinski",sv:["Cleanup","Mulch"]},{id:"l4",cn:"Dale",sv:[]}];
const QT=[
  {id:"q1",cn:"Erin Lewinski",d:"2025-10-19",tot:810,st:"sent",n:"9yd mulch x$90",li:[{nm:"Mulch",q:9,pr:90,t:810}]},
  {id:"q2",cn:"Pete",d:"2025-10-19",tot:225,st:"sent",n:"Brush cleanup",li:[{nm:"Brush Cleanup",q:1,pr:225,t:225}]},
  {id:"q3",cn:"Andrew",d:"2025-08-25",tot:5448,st:"accepted",n:"Trees+removal. 20% deposit. 90-day warranty",li:[{nm:"Green Giant",q:6,pr:230,t:1380},{nm:"Emerald Green",q:27,pr:155,t:4185},{nm:"Spruce Removal",q:5,pr:130,t:650},{nm:"Boxwood Remove",q:33,pr:15,t:495},{nm:"Dump",q:1,pr:100,t:100}]},
  {id:"q4",cn:"Emily Irvin",d:"2025-09-04",tot:1100,st:"sent",n:"Sod+weeding",li:[{nm:"Sod",q:45,pr:10,t:450},{nm:"Sod Install",q:1,pr:350,t:350},{nm:"Weeding",q:1,pr:300,t:300}]},
  {id:"q5",cn:"Joanne Edwards",d:"2025-10-01",tot:275,st:"sent",n:"Wood chip redistribution",li:[{nm:"Wood Chip Removal",q:1,pr:275,t:275}]},
];
const PR=[
  {id:"p1",nm:"Spring Cleanup",pr:200,cat:"Cleanup"},{id:"p2",nm:"Fall Cleanup",pr:225,cat:"Cleanup"},
  {id:"p3",nm:"Leaf Removal",pr:50,cat:"Cleanup"},{id:"p4",nm:"Mulch Install",pr:90,cat:"Mulch"},
  {id:"p5",nm:"Mowing-Sm",pr:35,cat:"Mowing"},{id:"p6",nm:"Mowing-Md",pr:50,cat:"Mowing"},{id:"p7",nm:"Mowing-Lg",pr:75,cat:"Mowing"},
  {id:"p8",nm:"Hedge Trim",pr:55,cat:"Trim"},{id:"p9",nm:"Shrub Remove",pr:55,cat:"Trim"},
  {id:"p10",nm:"Edging",pr:1.5,cat:"Detail"},{id:"p11",nm:"Weeding",pr:45,cat:"Detail"},
  {id:"p12",nm:"Hauling",pr:75,cat:"Other"},
];
const SEED={cl:CL,jb:JB,pr:PR,qt:QT,sc:SC,ld:LD,biz:BUSI,nw:NW,yr:YR};
async function load(){try{const r=localStorage.getItem(SK);if(r)return JSON.parse(r);}catch(e){}return null;}
async function save(d){try{localStorage.setItem(SK,JSON.stringify(d));}catch(e){}}

function Modal({children,onClose,title}){
  return <div style={st.ov} onClick={onClose}>
    <div style={st.mod} onClick={e=>e.stopPropagation()}>
      <div style={st.mh}><h3 style={st.mt}>{title}</h3><button style={st.ib} onClick={onClose}><X size={16}/></button></div>
      <div style={st.mb}>{children}</div>
    </div>
  </div>;
}

function useVoice(){
  const[on,setOn]=useState(false);const r=useRef(null);const cb=useRef(null);
  const start=useCallback((c,i="")=>{const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){alert("Voice needs Chrome/Safari.");return;}cb.current=c;const x=new SR();x.continuous=true;x.interimResults=true;x.lang="en-US";let f=i||"";x.onresult=e=>{let t="";for(let i=e.resultIndex;i<e.results.length;i++){if(e.results[i].isFinal)f+=(f?" ":"")+e.results[i][0].transcript;else t+=e.results[i][0].transcript;}if(cb.current)cb.current(f+(t?" "+t:""));};x.onerror=()=>setOn(false);x.onend=()=>setOn(false);r.current=x;try{x.start();setOn(true);}catch(e){};},[]);
  const stop=useCallback(()=>{if(r.current){try{r.current.stop();}catch(e){}r.current=null;}setOn(false);},[]);
  return{on,start,stop};
}

/* ═══ AI PRICING ═══ */
function AIPrice({data,onClose}){
  const[msg,setMsg]=useState("");const[chat,setChat]=useState([]);const[busy,setBusy]=useState(false);const vc=useVoice();
  const hist=data.jb.map(j=>`${j.cn}: ${(j.sv||[]).join(",")||"general"} ${j.h}h $${j.p} exp:$${j.ex}`).join("; ");
  const avgRate=data.jb.reduce((s,j)=>s+Number(j.p||0),0)/Math.max(1,data.jb.reduce((s,j)=>s+Number(j.h||0),0));
  const ask=async()=>{if(!msg.trim()||busy)return;const q=msg;setMsg("");setChat(c=>[...c,{r:"u",t:q}]);setBusy(true);
    try{const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:800,system:`You are a landscaping pricing advisor for Cole's Landscape Co. in Waterford, Michigan. Cole charges below average. Helpers cost $20/hr. Mulch ~$26/yard. Dump fees ~$20. Gas ~$15 per 20min drive.\n\nRecent jobs: ${hist}\n\nAvg rate: ~$${avgRate.toFixed(0)}/hr before expenses.\n\nGive: 1) Estimated costs breakdown 2) Suggested price (budget/fair/premium) 3) Your effective hourly rate at that price 4) Whether to bring help. Be concise and direct.`,messages:[{role:"user",content:q}]})});
      const d=await res.json();setChat(c=>[...c,{r:"a",t:d.content?.map(x=>x.text||"").join("")||"Error"}]);
    }catch(e){setChat(c=>[...c,{r:"a",t:"Connection error."}]);}setBusy(false);};
  return <Modal title="AI Pricing Advisor" onClose={()=>{onClose();vc.stop();}}>
    <p style={{fontSize:11,color:"#6b7a8d",margin:"0 0 8px"}}>Describe a job and get pricing advice based on your history.</p>
    <div style={{maxHeight:260,overflowY:"auto",marginBottom:8}}>
      {chat.map((m,i)=><div key={i} style={{marginBottom:5,padding:"5px 7px",borderRadius:7,background:m.r==="u"?"rgba(52,211,153,0.06)":"rgba(96,165,250,0.06)",border:`1px solid ${m.r==="u"?"rgba(52,211,153,0.12)":"rgba(96,165,250,0.12)"}`}}>
        <span style={{fontSize:9,fontWeight:700,color:m.r==="u"?"#34d399":"#60a5fa"}}>{m.r==="u"?"YOU":"ADVISOR"}</span>
        <p style={{fontSize:11,color:"#e2e8f0",margin:"2px 0 0",whiteSpace:"pre-wrap",lineHeight:1.4}}>{m.t}</p>
      </div>)}
      {busy&&<p style={{fontSize:11,color:"#6b7a8d",textAlign:"center"}}>Analyzing...</p>}
    </div>
    <div style={{display:"flex",gap:3}}>
      <button style={{padding:"7px",borderRadius:5,background:vc.on?"rgba(239,68,68,0.1)":"rgba(255,255,255,0.04)",color:vc.on?"#ef4444":"#94a3b8",border:"none",cursor:"pointer"}} onClick={()=>{if(vc.on)vc.stop();else vc.start(t=>setMsg(t),msg);}}>{vc.on?<Square size={14}/>:<Mic size={14}/>}</button>
      <input style={{...st.inp,flex:1}} value={msg} onChange={e=>setMsg(e.target.value)} onKeyDown={e=>e.key==="Enter"&&ask()} placeholder="e.g. 10 yards mulch + cleanup, 5hrs..."/>
      <button style={{padding:"7px 10px",borderRadius:5,background:"#34d399",color:"#0b0e13",border:"none",fontWeight:700,cursor:"pointer"}} onClick={ask}><Send size={14}/></button>
    </div>
  </Modal>;
}

/* ═══ NET WORTH ═══ */
function Vault({data}){
  const[open,setOpen]=useState(false);const[pin,setPin]=useState("");const[ok,setOk]=useState(false);
  const nw=data.nw||NW;
  if(!open)return <button style={{display:"flex",alignItems:"center",gap:4,padding:"7px 0",borderRadius:7,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.04)",color:"#3b4557",fontSize:10,fontWeight:600,cursor:"pointer",width:"100%",justifyContent:"center",marginTop:5}} onClick={()=>setOpen(true)}><Lock size={12}/> Net Worth Vault</button>;
  return <div style={{background:"rgba(255,255,255,0.02)",borderRadius:9,padding:8,border:"1px solid rgba(255,255,255,0.04)",marginTop:5}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{fontSize:12,fontWeight:700}}>Net Worth</span><button style={st.ib} onClick={()=>{setOpen(false);setOk(false);setPin("");}}><X size={14}/></button></div>
    {!ok?<div style={{display:"flex",gap:3}}><input style={{...st.inp,flex:1}} type="password" placeholder="PIN" value={pin} onChange={e=>setPin(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"){if(pin===nw.pin)setOk(true);else{alert("Wrong");setPin("");}}}}/><button style={{padding:"6px 10px",borderRadius:5,background:"#34d399",color:"#0b0e13",border:"none",fontWeight:700,fontSize:11,cursor:"pointer"}} onClick={()=>{if(pin===nw.pin)setOk(true);else{alert("Wrong");setPin("");}}}>Go</button></div>
    :<div>
      {nw.cats.map((c,i)=><div key={i} style={{marginBottom:6}}><span style={{fontSize:9,fontWeight:700,color:"#6b7a8d"}}>{c.t}</span>{c.items.map((x,j)=><div key={j} style={{display:"flex",justifyContent:"space-between",fontSize:11,padding:"1px 0"}}><span style={{color:"#94a3b8"}}>{x.n}</span><span style={{color:"#34d399",fontWeight:600}}>{fmt$(x.v)}</span></div>)}</div>)}
      <div style={{borderTop:"2px solid rgba(52,211,153,0.15)",paddingTop:5,marginTop:4}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:12}}><span style={{fontWeight:700}}>Gross</span><span style={{fontWeight:800,color:"#34d399"}}>{fmt$(nw.gross)}</span></div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:11}}><span style={{color:"#f87171"}}>Debt</span><span style={{color:"#f87171"}}>-{fmt$(nw.debt)}</span></div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:15,marginTop:3}}><span style={{fontWeight:900}}>NET</span><span style={{fontWeight:900,color:"#34d399"}}>{fmt$(nw.net)}</span></div>
      </div>
    </div>}
  </div>;
}

/* ═══ HOME ═══ */
function HomePage({data,go,onTalk}){
  const[showAI,setShowAI]=useState(false);const[blurYr,setBlurYr]=useState(true);const[selYr,setSelYr]=useState(null);
  const t=td();const now=new Date();const mo=now.getMonth();const yr=now.getFullYear();
  const up=[...data.sc].filter(s=>s.d>=t&&s.st!=="completed").sort((a,b)=>a.d.localeCompare(b.d));
  const todJ=up.filter(s=>s.d===t);const nxt=up.filter(s=>s.d!==t).slice(0,5);
  // This month's jobs
  const moJobs=data.jb.filter(j=>{const d=new Date(j.d+"T12:00:00");return d.getMonth()===mo&&d.getFullYear()===yr;});
  const moR=moJobs.reduce((s,j)=>s+Number(j.p||0),0);const moE=moJobs.reduce((s,j)=>s+Number(j.ex||0),0);
  // This season (all tracked jobs)
  const tR=data.jb.reduce((s,j)=>s+Number(j.p||0),0);const tE=data.jb.reduce((s,j)=>s+Number(j.ex||0),0);
  const tH=data.jb.reduce((s,j)=>s+Number(j.h||0),0);const avgRate=tH>0?tR/tH:0;
  // Pending payments
  const pend=data.jb.filter(j=>j.ps==="pending");const pendTot=pend.reduce((s,j)=>s+Number(j.p||0),0);
  // Next 7 days revenue potential
  const next7=t;const d7=new Date(now);d7.setDate(d7.getDate()+7);const d7s=d7.toISOString().split("T")[0];
  // Monthly breakdown for selected year
  const moNames=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const getMonthly=(year)=>moNames.map((_,i)=>{const mj=data.jb.filter(j=>{const d=new Date(j.d+"T12:00:00");return d.getFullYear()===year&&d.getMonth()===i;});return{m:moNames[i],r:mj.reduce((s,j)=>s+Number(j.p||0),0),e:mj.reduce((s,j)=>s+Number(j.ex||0),0)};}).filter(x=>x.r>0||x.e>0);

  return <div style={st.pg}>
    {/* Header with mic in top-right */}
    <div style={{background:"linear-gradient(135deg,#0f1923,#162030)",borderRadius:11,padding:"10px 12px",margin:"0 0 8px",display:"flex",alignItems:"center",gap:10,border:"1px solid rgba(52,211,153,0.15)"}}>
      <img src={LOGO} alt="" style={{width:40,height:40,borderRadius:8,border:"2px solid rgba(52,211,153,0.25)",objectFit:"contain",background:"#fff"}} onError={e=>{e.target.style.display="none";}}/>
      <div style={{flex:1}}><h1 style={{margin:0,fontSize:15,fontWeight:900,color:"#34d399",letterSpacing:"0.04em"}}>{data.biz?.name}</h1><p style={{margin:0,fontSize:10,color:"#6b7a8d"}}>{data.biz?.owner} · {data.biz?.phone}</p></div>
      <button onClick={onTalk} style={{width:36,height:36,borderRadius:18,background:"linear-gradient(135deg,#34d399,#10b981)",border:"none",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",boxShadow:"0 2px 12px rgba(52,211,153,0.3)",flexShrink:0}}><Mic size={18}/></button>
    </div>

    {/* This Month stats */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
      <div style={st.stat}><span style={st.stL}>{moNames[mo]} Revenue</span><span style={st.stV}>{fmt$(moR)}</span></div>
      <div style={st.stat}><span style={st.stL}>{moNames[mo]} Expenses</span><span style={{...st.stV,color:"#f87171"}}>{fmt$(moE)}</span></div>
    </div>
    <div style={{background:"linear-gradient(135deg,rgba(52,211,153,0.07),rgba(52,211,153,0.02))",borderRadius:8,padding:7,border:"1px solid rgba(52,211,153,0.12)",marginTop:4,textAlign:"center"}}>
      <span style={{fontSize:8,color:"#5a6577",textTransform:"uppercase",fontWeight:700}}>{moNames[mo]} {yr} Profit</span>
      <span style={{display:"block",fontSize:20,fontWeight:900,color:moR-moE>=0?"#34d399":"#f87171"}}>{fmt$(moR-moE)}</span>
    </div>

    {/* All-time row */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:3,marginTop:5}}>
      <div style={{background:"rgba(255,255,255,0.02)",borderRadius:5,padding:"4px",textAlign:"center"}}><span style={{display:"block",fontSize:7,color:"#5a6577",textTransform:"uppercase",fontWeight:700}}>All-Time Rev</span><span style={{fontSize:12,fontWeight:700,color:"#e2e8f0"}}>{fmt$(tR)}</span></div>
      <div style={{background:"rgba(255,255,255,0.02)",borderRadius:5,padding:"4px",textAlign:"center"}}><span style={{display:"block",fontSize:7,color:"#5a6577",textTransform:"uppercase",fontWeight:700}}>Avg $/Hr</span><span style={{fontSize:12,fontWeight:700,color:"#34d399"}}>{fmt$(avgRate)}</span></div>
      <div style={{background:"rgba(255,255,255,0.02)",borderRadius:5,padding:"4px",textAlign:"center"}}><span style={{display:"block",fontSize:7,color:"#5a6577",textTransform:"uppercase",fontWeight:700}}>Total Hours</span><span style={{fontSize:12,fontWeight:700,color:"#e2e8f0"}}>{tH.toFixed(0)}h</span></div>
    </div>

    {/* Yearly - tap to unblur, tap year for monthly */}
    <div style={{marginTop:5}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
        <span style={{fontSize:9,fontWeight:700,color:"#5a6577",textTransform:"uppercase"}}>Yearly</span>
        <button onClick={()=>setBlurYr(!blurYr)} style={{background:"none",border:"none",color:"#5a6577",fontSize:9,cursor:"pointer"}}>{blurYr?"Tap to show":"Tap to hide"}</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:3}}>
        {(data.yr||YR).map(y=><button key={y.y} onClick={()=>setSelYr(selYr===y.y?null:y.y)} style={{background:selYr===y.y?"rgba(52,211,153,0.08)":"rgba(255,255,255,0.02)",borderRadius:5,padding:"3px 2px",textAlign:"center",border:selYr===y.y?"1px solid rgba(52,211,153,0.15)":"1px solid transparent",cursor:"pointer"}}>
          <span style={{display:"block",fontSize:9,color:"#5a6577",fontWeight:700}}>{y.y}</span>
          <span style={{display:"block",fontSize:10,fontWeight:700,color:"#e2e8f0",filter:blurYr?"blur(6px)":"none",transition:"filter 0.3s"}}>{fmt$(y.r)}</span>
          <span style={{display:"block",fontSize:8,color:y.p>=0?"#34d399":"#f87171",fontWeight:600,filter:blurYr?"blur(6px)":"none",transition:"filter 0.3s"}}>{fmt$(y.p)}</span>
        </button>)}
      </div>
      {/* Monthly breakdown */}
      {selYr&&!blurYr&&<div style={{marginTop:4,padding:"6px 8px",background:"rgba(255,255,255,0.02)",borderRadius:7,border:"1px solid rgba(255,255,255,0.04)"}}>
        <span style={{fontSize:9,fontWeight:700,color:"#5a6577"}}>{selYr} Monthly</span>
        {getMonthly(selYr).map(m=><div key={m.m} style={{display:"flex",justifyContent:"space-between",padding:"2px 0",fontSize:11}}>
          <span style={{color:"#94a3b8",fontWeight:600,width:30}}>{m.m}</span>
          <span style={{color:"#e2e8f0"}}>{fmt$(m.r)}</span>
          <span style={{color:"#f87171"}}>{fmt$(m.e)}</span>
          <span style={{color:m.r-m.e>=0?"#34d399":"#f87171",fontWeight:700}}>{fmt$(m.r-m.e)}</span>
        </div>)}
      </div>}
    </div>

    {/* Action buttons */}
    <div style={{display:"flex",gap:4,margin:"7px 0"}}>
      <button style={st.pBtn} onClick={()=>go("schedule")}><Plus size={14}/> Schedule</button>
      <button style={st.sBtn} onClick={()=>window.open(GSHEET,"_blank")}><Table2 size={14}/> Quote</button>
      <button style={{padding:"9px 10px",borderRadius:7,background:"rgba(96,165,250,0.08)",color:"#60a5fa",border:"1px solid rgba(96,165,250,0.12)",cursor:"pointer",display:"flex",alignItems:"center"}} onClick={()=>setShowAI(true)}><Bot size={16}/></button>
    </div>

    {/* Pending Payments */}
    {pend.length>0&&<div style={{background:"rgba(250,204,21,0.04)",borderRadius:7,padding:"5px 8px",border:"1px solid rgba(250,204,21,0.1)",marginBottom:7}}>
      <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:9,fontWeight:700,color:"#facc15"}}>PENDING PAYMENTS</span><span style={{fontSize:11,fontWeight:700,color:"#facc15"}}>{fmt$(pendTot)}</span></div>
      {pend.map(j=><div key={j.id} style={{display:"flex",justifyContent:"space-between",fontSize:11,padding:"1px 0"}}><span style={{color:"#e2e8f0"}}>{j.cn}</span><span style={{color:"#facc15",fontWeight:700}}>{fmt$(j.p)}</span></div>)}
    </div>}

    {/* Today */}
    <div style={st.sec}><h3 style={st.secT}>Today</h3>
      {todJ.length===0?<p style={st.em}>Free day.</p>:todJ.map(j=><div key={j.id} style={st.sc}><span style={st.scN}>{j.cn}</span><span style={st.scM}>{j.t||"TBD"} · {j.eh}h</span></div>)}
    </div>

    {/* Upcoming */}
    <div style={st.sec}><h3 style={st.secT}>Upcoming</h3>
      {nxt.map(j=>{const d=dfn(j.d);return <div key={j.id} style={st.sc}><div style={{display:"flex",justifyContent:"space-between"}}><div><span style={st.scN}>{j.cn}</span><span style={st.scM}>{fDF(j.d)} · {j.t||"TBD"}</span></div><span style={{padding:"1px 6px",borderRadius:8,background:d<=2?"rgba(239,68,68,0.08)":"rgba(52,211,153,0.06)",color:d<=2?"#f87171":"#34d399",fontSize:9,fontWeight:700}}>{d<=0?"Now":d===1?"Tmrw":`${d}d`}</span></div></div>;})}
      <button style={st.lnk} onClick={()=>go("schedule")}>Full schedule →</button>
    </div>

    {/* Leads */}
    {(data.ld||[]).length>0&&<div style={st.sec}><h3 style={{...st.secT,color:"#f59e0b"}}>Leads ({data.ld.length})</h3>
      {data.ld.map(l=><div key={l.id} style={{...st.sc,borderLeft:"3px solid rgba(245,158,11,0.25)"}}><span style={st.scN}>{l.cn}</span><span style={st.scM}>{(l.sv||[]).join(", ")||"TBD"}</span></div>)}
    </div>}

    {/* Quick Stats */}
    <div style={{display:"flex",justifyContent:"space-around",background:"rgba(255,255,255,0.02)",borderRadius:7,padding:"9px 0"}}>
      {[{n:data.cl.length,l:"Clients"},{n:data.jb.length,l:"Jobs Done"},{n:up.length,l:"Queued"},{n:pend.length,l:"Pending"}].map((x,i)=><div key={i} style={{textAlign:"center"}}><span style={{display:"block",fontSize:14,fontWeight:800,color:i===3&&x.n>0?"#facc15":"#f1f5f9"}}>{x.n}</span><span style={{fontSize:7,color:"#5a6577",textTransform:"uppercase",fontWeight:600}}>{x.l}</span></div>)}
    </div>
    <Vault data={data}/>
    {showAI&&<AIPrice data={data} onClose={()=>setShowAI(false)}/>}
  </div>;
}

/* ═══ SCHEDULE ═══ */
function Sched({data,setData}){
  const[sel,setSel]=useState(td());const[sf,setSf]=useState(false);const[ed,setEd]=useState(null);
  const[ws,setWs]=useState(()=>{const d=new Date();d.setDate(d.getDate()-d.getDay());return d.toISOString().split("T")[0];});
  const bl={cn:"",d:td(),t:"09:00",eh:"2",sv:[],n:"",st:"scheduled"};const[fm,setFm]=useState(bl);
  const wd=useMemo(()=>{const r=[];const w=new Date(ws+"T12:00:00");for(let i=0;i<7;i++){const x=new Date(w);x.setDate(w.getDate()+i);r.push(x.toISOString().split("T")[0]);}return r;},[ws]);
  const sj=data.sc.filter(s=>s.d===sel).sort((a,b)=>(a.t||"").localeCompare(b.t||""));
  const svS=()=>{if(!fm.cn.trim())return;const e={...fm};let u;if(ed)u={...data,sc:data.sc.map(s=>s.id===ed?{...e,id:ed}:s)};else u={...data,sc:[...data.sc,{...e,id:uid()}]};setData(u);save(u);setSf(false);};
  const done=s=>{const j={id:uid(),cn:s.cn,d:s.d,sv:s.sv,h:s.eh,p:"",ex:"0",n:s.n,ps:"pending"};const u={...data,sc:data.sc.map(x=>x.id===s.id?{...x,st:"completed"}:x),jb:[...data.jb,j]};setData(u);save(u);};
  const del=id=>{if(!confirm("Delete?"))return;const u={...data,sc:data.sc.filter(s=>s.id!==id)};setData(u);save(u);};
  const t=td();const dn=["S","M","T","W","T","F","S"];
  return <div style={st.pg}>
    <div style={st.ph}><h2 style={st.pt}>Schedule</h2><button style={st.ab} onClick={()=>{setFm({...bl,d:sel});setEd(null);setSf(true);}}><Plus size={15}/></button></div>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}>
      <button style={st.ib} onClick={()=>{const w=new Date(ws+"T12:00:00");w.setDate(w.getDate()-7);setWs(w.toISOString().split("T")[0]);}}><ChevronLeft size={18}/></button>
      <span style={{fontSize:12,fontWeight:700,color:"#e2e8f0"}}>{new Date(wd[3]+"T12:00:00").toLocaleDateString("en-US",{month:"long",year:"numeric"})}</span>
      <button style={st.ib} onClick={()=>{const w=new Date(ws+"T12:00:00");w.setDate(w.getDate()+7);setWs(w.toISOString().split("T")[0]);}}><ChevronRight size={18}/></button>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2,marginBottom:6}}>
      {wd.map((d,i)=>{const iS=d===sel,iT=d===t,has=data.sc.some(s=>s.d===d&&s.st!=="completed");
        return <button key={d} onClick={()=>setSel(d)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:0,padding:"5px 0",borderRadius:6,background:iS?"#34d399":"rgba(255,255,255,0.02)",border:iT&&!iS?"1px solid rgba(52,211,153,0.3)":"1px solid transparent",cursor:"pointer",position:"relative",color:iS?"#0b0e13":"#e2e8f0"}}>
          <span style={{fontSize:8,fontWeight:600,color:iS?"#0b0e13":"#5a6577"}}>{dn[i]}</span>
          <span style={{fontSize:13,fontWeight:700}}>{new Date(d+"T12:00:00").getDate()}</span>
          {has&&<span style={{width:3,height:3,borderRadius:2,background:iS?"#0b0e13":"#34d399",position:"absolute",bottom:2}}/>}
        </button>;})}
    </div>
    <div style={st.sec}><h3 style={st.secT}>{fDF(sel)}</h3>
      {sj.length===0?<p style={st.em}>No jobs.</p>:sj.map(j=><div key={j.id} style={{...st.sc,...(j.st==="completed"?{opacity:.4}:{})}}>
        <div style={{display:"flex",justifyContent:"space-between"}}>
          <div><span style={st.scN}>{j.cn}</span><span style={st.scM}>{j.t||"TBD"} · {j.eh}h</span></div>
          <div style={{display:"flex",gap:2}}>
            <a href={gcl({clientName:j.cn,date:j.d,time:j.t,estimatedHours:j.eh,services:j.sv,notes:j.n,address:""})} target="_blank" rel="noopener" style={st.gcB}><Calendar size={12}/></a>
            {j.st!=="completed"&&<button style={{...st.gcB,background:"rgba(52,211,153,0.08)",color:"#34d399"}} onClick={()=>done(j)}><Check size={12}/></button>}
          </div>
        </div>
        {j.n&&<p style={{fontSize:9,color:"#5a6577",marginTop:1}}>{j.n}</p>}
        <div style={{display:"flex",gap:3,marginTop:3}}>
          <button style={st.sm} onClick={()=>{setFm({...j});setEd(j.id);setSf(true);}}><Pencil size={10}/></button>
          <button style={{...st.sm,color:"#f87171"}} onClick={()=>del(j.id)}><Trash2 size={10}/></button>
        </div>
      </div>)}
    </div>
    {sf&&<Modal title={ed?"Edit":"Schedule"} onClose={()=>setSf(false)}>
      <div style={st.fg}><label style={st.lb}>Client</label><input style={st.inp} value={fm.cn} onChange={e=>setFm({...fm,cn:e.target.value})} placeholder="Name"/></div>
      <div style={{display:"flex",gap:5}}>
        <div style={{...st.fg,flex:1}}><label style={st.lb}>Date</label><input style={st.inp} type="date" value={fm.d} onChange={e=>setFm({...fm,d:e.target.value})}/></div>
        <div style={{...st.fg,flex:1}}><label style={st.lb}>Time</label><input style={st.inp} type="time" value={fm.t} onChange={e=>setFm({...fm,t:e.target.value})}/></div>
      </div>
      <div style={st.fg}><label style={st.lb}>Est Hours</label><input style={st.inp} type="number" step=".25" value={fm.eh} onChange={e=>setFm({...fm,eh:e.target.value})}/></div>
      <div style={st.fg}><label style={st.lb}>Notes</label><textarea style={st.ta} value={fm.n} onChange={e=>setFm({...fm,n:e.target.value})} rows={2}/></div>
      <button style={st.saveBtn} onClick={svS}><Check size={14}/> {ed?"Update":"Schedule"}</button>
    </Modal>}
  </div>;
}

/* ═══ CLIENTS ═══ */
function ClientsPage({data,setData}){
  const[sf,setSf]=useState(false);const[ed,setEd]=useState(null);const[sr,setSr]=useState("");const[ex,setEx]=useState(null);
  const[fm,setFm]=useState({name:"",phone:"",address:"",notes:""});
  const fl=data.cl.filter(c=>c.name.toLowerCase().includes(sr.toLowerCase()));
  const svC=()=>{if(!fm.name.trim())return;let u;if(ed)u={...data,cl:data.cl.map(c=>c.id===ed?{...fm,id:ed}:c)};else u={...data,cl:[...data.cl,{...fm,id:uid()}]};setData(u);save(u);setSf(false);};
  return <div style={st.pg}>
    <div style={st.ph}><h2 style={st.pt}>Clients ({data.cl.length})</h2><button style={st.ab} onClick={()=>{setFm({name:"",phone:"",address:"",notes:""});setEd(null);setSf(true);}}><Plus size={15}/></button></div>
    <div style={st.srB}><Search size={14}/><input style={st.srI} placeholder="Search..." value={sr} onChange={e=>setSr(e.target.value)}/></div>
    {fl.map(c=><div key={c.id} style={st.cd} onClick={()=>setEx(ex===c.id?null:c.id)}>
      <div style={{display:"flex",justifyContent:"space-between"}}><div><span style={st.cdT}>{c.name}</span>{c.phone&&<span style={st.cdS}><Phone size={10}/> {c.phone}</span>}</div>
        <button style={st.ibs} onClick={ev=>{ev.stopPropagation();setFm({...c});setEd(c.id);setSf(true);}}><Pencil size={12}/></button></div>
      {ex===c.id&&<div style={{marginTop:3,fontSize:10,color:"#6b7a8d"}}>{c.address&&<p style={{margin:"0 0 1px"}}>{c.address}</p>}{c.notes&&<p style={{margin:0}}>{c.notes}</p>}</div>}
    </div>)}
    {sf&&<Modal title={ed?"Edit":"New Client"} onClose={()=>setSf(false)}>
      <div style={st.fg}><label style={st.lb}>Name</label><input style={st.inp} value={fm.name} onChange={e=>setFm({...fm,name:e.target.value})}/></div>
      <div style={st.fg}><label style={st.lb}>Phone</label><input style={st.inp} type="tel" value={fm.phone} onChange={e=>setFm({...fm,phone:e.target.value})}/></div>
      <div style={st.fg}><label style={st.lb}>Address</label><input style={st.inp} value={fm.address} onChange={e=>setFm({...fm,address:e.target.value})}/></div>
      <div style={st.fg}><label style={st.lb}>Notes</label><textarea style={st.ta} value={fm.notes} onChange={e=>setFm({...fm,notes:e.target.value})} rows={2}/></div>
      <button style={st.saveBtn} onClick={svC}><Check size={14}/> {ed?"Update":"Add"}</button>
    </Modal>}
  </div>;
}

/* ═══ JOBS ═══ */
function JobsPage({data,setData}){
  const[sf,setSf]=useState(false);const[ed,setEd]=useState(null);const[sr,setSr]=useState("");const[ex,setEx]=useState(null);const vc=useVoice();
  const bl={cn:"",d:td(),sv:[],h:"",p:"",ex:"",mat:"",n:"",ps:"paid"};const[fm,setFm]=useState(bl);
  const sorted=[...data.jb].sort((a,b)=>b.d.localeCompare(a.d));
  const fl=sorted.filter(j=>j.cn.toLowerCase().includes(sr.toLowerCase()));
  const svJ=()=>{if(!fm.cn.trim())return;let u;if(ed)u={...data,jb:data.jb.map(j=>j.id===ed?{...fm,id:ed}:j)};else u={...data,jb:[...data.jb,{...fm,id:uid()}]};setData(u);save(u);setSf(false);vc.stop();};
  const tR=data.jb.reduce((s,j)=>s+Number(j.p||0),0);const tE=data.jb.reduce((s,j)=>s+Number(j.ex||0),0);
  return <div style={st.pg}>
    <div style={st.ph}><h2 style={st.pt}>Jobs ({data.jb.length})</h2><button style={st.ab} onClick={()=>{setFm(bl);setEd(null);setSf(true);}}><Plus size={15}/></button></div>
    <div style={{display:"flex",gap:6,marginBottom:5,padding:"4px 6px",borderRadius:5,background:"rgba(255,255,255,0.02)",fontSize:11}}>
      <span style={{color:"#e2e8f0",fontWeight:600}}>Rev {fmt$(tR)}</span>
      <span style={{color:"#f87171",fontWeight:600}}>Exp {fmt$(tE)}</span>
      <span style={{color:"#34d399",fontWeight:700}}>Profit {fmt$(tR-tE)}</span>
    </div>
    <div style={st.srB}><Search size={14}/><input style={st.srI} placeholder="Search..." value={sr} onChange={e=>setSr(e.target.value)}/></div>
    {fl.map(j=>{const pr=Number(j.p||0)-Number(j.ex||0);const hrs=Number(j.h||0);const isE=ex===j.id;
      return <div key={j.id} style={{...st.cd,...(j.ps==="pending"?{borderLeft:"2px solid #facc15"}:{})}} onClick={()=>setEx(isE?null:j.id)}>
        <div style={{display:"flex",justifyContent:"space-between"}}><div><span style={st.cdT}>{j.cn}{j.ps==="pending"?" ⏳":""}</span><span style={st.cdS}>{fD(j.d)} · {hrs}h</span></div>
          <div style={{textAlign:"right"}}><span style={{fontSize:13,fontWeight:700,color:"#34d399"}}>{fmt$(j.p)}</span>{Number(j.ex)>0&&<div style={{fontSize:9,color:"#f87171"}}>-{fmt$(j.ex)}</div>}</div></div>
        {isE&&<div style={{marginTop:4,paddingTop:4,borderTop:"1px solid rgba(255,255,255,0.03)",fontSize:10,color:"#94a3b8"}}>
          {j.mat&&<p style={{margin:"0 0 1px"}}><b>Materials:</b> {j.mat}</p>}
          {j.n&&<p style={{margin:"0 0 1px"}}><b>Notes:</b> {j.n}</p>}
          <p style={{margin:0}}><b>Profit:</b> <span style={{color:"#34d399"}}>{fmt$(pr)}</span>{hrs>0&&` · ${fmt$(pr/hrs)}/hr`}</p>
          <div style={{display:"flex",gap:3,marginTop:3}}>
            <button style={st.sm} onClick={e=>{e.stopPropagation();setFm({...j});setEd(j.id);setSf(true);}}><Pencil size={10}/></button>
            <button style={st.sm} onClick={e=>{e.stopPropagation();const u={...data,jb:data.jb.map(x=>x.id===j.id?{...x,ps:j.ps==="pending"?"paid":"pending"}:x)};setData(u);save(u);}}>{j.ps==="pending"?"✅":"⏳"}</button>
            <button style={{...st.sm,color:"#f87171"}} onClick={e=>{e.stopPropagation();if(!confirm("Delete?"))return;const u={...data,jb:data.jb.filter(x=>x.id!==j.id)};setData(u);save(u);}}><Trash2 size={10}/></button>
          </div>
        </div>}
      </div>;})}
    {sf&&<Modal title={ed?"Edit":"Log Job"} onClose={()=>{setSf(false);vc.stop();}}>
      <div style={st.fg}><label style={st.lb}>Client</label><input style={st.inp} value={fm.cn} onChange={e=>setFm({...fm,cn:e.target.value})}/></div>
      <div style={st.fg}><label style={st.lb}>Date</label><input style={st.inp} type="date" value={fm.d} onChange={e=>setFm({...fm,d:e.target.value})}/></div>
      <div style={{display:"flex",gap:5}}>
        <div style={{...st.fg,flex:1}}><label style={st.lb}>Hours</label><input style={st.inp} type="number" step=".25" value={fm.h} onChange={e=>setFm({...fm,h:e.target.value})}/></div>
        <div style={{...st.fg,flex:1}}><label style={st.lb}>Paid $</label><input style={st.inp} type="number" value={fm.p} onChange={e=>setFm({...fm,p:e.target.value})}/></div>
      </div>
      <div style={{display:"flex",gap:5}}>
        <div style={{...st.fg,flex:1}}><label style={st.lb}>Expenses $</label><input style={st.inp} type="number" value={fm.ex} onChange={e=>setFm({...fm,ex:e.target.value})}/></div>
        <div style={{...st.fg,flex:1}}><label style={st.lb}>Materials</label><input style={st.inp} value={fm.mat} onChange={e=>setFm({...fm,mat:e.target.value})}/></div>
      </div>
      <div style={st.fg}>
        <label style={{...st.lb,justifyContent:"space-between"}}>Notes
          <button style={{padding:"2px 5px",borderRadius:3,background:vc.on?"rgba(239,68,68,0.1)":"rgba(255,255,255,0.03)",color:vc.on?"#ef4444":"#94a3b8",border:"none",fontSize:8,cursor:"pointer",display:"flex",alignItems:"center",gap:2}} onClick={()=>{if(vc.on)vc.stop();else vc.start(t=>setFm(f=>({...f,n:t})),fm.n);}}>{vc.on?<><Square size={8}/> Stop</>:<><Mic size={8}/> Voice</>}</button>
        </label>
        <textarea style={st.ta} value={fm.n} onChange={e=>setFm({...fm,n:e.target.value})} rows={3}/>
      </div>
      <button style={st.saveBtn} onClick={svJ}><Check size={14}/> {ed?"Update":"Save"}</button>
    </Modal>}
  </div>;
}

/* ═══ QUOTES ═══ */
function QuotesPage({data,setData}){
  const[sb,setSb]=useState(false);const[ed,setEd]=useState(null);const[ft,setFt]=useState("all");const[ex,setEx]=useState(null);const[cp,setCp]=useState(false);
  const bQ={cn:"",d:td(),li:[],n:"",st:"draft",tot:0};const[fm,setFm]=useState(bQ);
  const cats=[...new Set(data.pr.map(p=>p.cat))];
  const aL=p=>setFm(f=>({...f,li:[...f.li,{nm:p.nm,q:1,pr:p.pr,t:p.pr}]}));
  const uQ=(i,q)=>setFm(f=>({...f,li:f.li.map((l,j)=>j===i?{...l,q:Number(q),t:Number(q)*l.pr}:l)}));
  const tot=fm.li.reduce((s,l)=>s+l.t,0);
  const svQ=s=>{if(!fm.cn.trim())return;const e={...fm,tot,st:s};let u;if(ed)u={...data,qt:data.qt.map(q=>q.id===ed?{...e,id:ed}:q)};else u={...data,qt:[...data.qt,{...e,id:uid()}]};setData(u);save(u);setSb(false);};
  const gT=q=>{const c=q||fm;let t=`QUOTE\n${c.cn}\n---\n`;(c.li||[]).forEach(l=>t+=`${l.nm} x${l.q}: ${fmt$(l.t)}\n`);t+=`---\nTOTAL: ${fmt$(c.tot||tot)}\n`;if(c.n)t+=`\n${c.n}\n`;t+=`\n— ${data.biz?.owner}, ${data.biz?.name}`;return t;};
  const copy=q=>{navigator.clipboard.writeText(gT(q));setCp(q?.id||"n");setTimeout(()=>setCp(false),2e3);};
  const fQ=data.qt.filter(q=>ft==="all"||q.st===ft).sort((a,b)=>(b.d||"").localeCompare(a.d||""));
  const sc={draft:"#94a3b8",sent:"#60a5fa",accepted:"#34d399",declined:"#f87171"};
  return <div style={st.pg}>
    <div style={st.ph}><h2 style={st.pt}>Quotes ({data.qt.length})</h2>
      <div style={{display:"flex",gap:3}}>
        <button style={st.ab} onClick={()=>{setFm(bQ);setEd(null);setSb(true);}}><Plus size={15}/></button>
        <a href={GSHEET} target="_blank" rel="noopener" style={{...st.ab,background:"rgba(96,165,250,0.12)",color:"#60a5fa",textDecoration:"none"}}><Table2 size={15}/></a>
      </div>
    </div>
    <div style={{display:"flex",gap:2,marginBottom:7,overflowX:"auto"}}>
      {["all","draft","sent","accepted","declined"].map(f=><button key={f} style={{padding:"3px 7px",borderRadius:12,background:ft===f?"rgba(52,211,153,0.07)":"rgba(255,255,255,0.02)",color:ft===f?"#34d399":"#5a6577",border:"1px solid "+(ft===f?"rgba(52,211,153,0.1)":"transparent"),fontSize:9,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}} onClick={()=>setFt(f)}>{f} ({f==="all"?data.qt.length:data.qt.filter(q=>q.st===f).length})</button>)}
    </div>
    {fQ.map(q=>{const isE=ex===q.id;return <div key={q.id} style={st.cd} onClick={()=>setEx(isE?null:q.id)}>
      <div style={{display:"flex",justifyContent:"space-between"}}><div><span style={st.cdT}>{q.cn}</span><span style={st.cdS}>{fD(q.d)}</span></div><div style={{textAlign:"right"}}><span style={{fontSize:13,fontWeight:700,color:"#34d399"}}>{fmt$(q.tot)}</span><span style={{display:"block",fontSize:9,color:sc[q.st],fontWeight:600}}>{q.st}</span></div></div>
      {isE&&<div style={{marginTop:4,paddingTop:4,borderTop:"1px solid rgba(255,255,255,0.03)"}}>
        {q.li?.map((l,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#94a3b8"}}><span>{l.nm} x{l.q}</span><span>{fmt$(l.t)}</span></div>)}
        {q.n&&<p style={{fontSize:10,color:"#5a6577",marginTop:2}}>{q.n}</p>}
        <div style={{display:"flex",gap:2,marginTop:4}}>
          <button style={st.sm} onClick={e=>{e.stopPropagation();copy(q);}}>{cp===q.id?<Check size={10}/>:<Copy size={10}/>}</button>
          <button style={st.sm} onClick={e=>{e.stopPropagation();setFm({...q});setEd(q.id);setSb(true);}}><Pencil size={10}/></button>
          {q.st==="sent"&&<><button style={{...st.sm,color:"#34d399"}} onClick={e=>{e.stopPropagation();const u={...data,qt:data.qt.map(x=>x.id===q.id?{...x,st:"accepted"}:x)};setData(u);save(u);}}>✓</button><button style={{...st.sm,color:"#f87171"}} onClick={e=>{e.stopPropagation();const u={...data,qt:data.qt.map(x=>x.id===q.id?{...x,st:"declined"}:x)};setData(u);save(u);}}>✗</button></>}
        </div>
      </div>}
    </div>;})}
    {sb&&<Modal title={ed?"Edit":"Build Quote"} onClose={()=>setSb(false)}>
      <div style={st.fg}><label style={st.lb}>Client</label><input style={st.inp} value={fm.cn} onChange={e=>setFm({...fm,cn:e.target.value})} placeholder="Name"/></div>
      <div style={st.fg}><label style={st.lb}>Add Services</label>
        {cats.map(cat=><div key={cat} style={{marginBottom:4}}><span style={{fontSize:8,fontWeight:700,color:"#5a6577"}}>{cat}</span><div style={{display:"flex",flexWrap:"wrap",gap:2,marginTop:1}}>{data.pr.filter(p=>p.cat===cat).map(p=><button key={p.id} style={{padding:"2px 5px",borderRadius:4,background:"rgba(255,255,255,0.02)",color:"#94a3b8",border:"1px solid rgba(255,255,255,0.03)",fontSize:8,cursor:"pointer"}} onClick={()=>aL(p)}>+ {p.nm} {fmt$(p.pr)}</button>)}</div></div>)}
      </div>
      {fm.li.length>0&&<>
        {fm.li.map((l,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:4,padding:"3px 0",borderBottom:"1px solid rgba(255,255,255,0.02)"}}><span style={{flex:1,fontSize:11,color:"#e2e8f0"}}>{l.nm}</span><input style={{width:34,padding:2,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.05)",borderRadius:3,color:"#e2e8f0",fontSize:11,textAlign:"center",outline:"none"}} type="number" min=".5" step=".5" value={l.q} onChange={e=>uQ(i,e.target.value)}/><span style={{fontSize:11,fontWeight:700,color:"#34d399",minWidth:42,textAlign:"right"}}>{fmt$(l.t)}</span><button style={st.ibs} onClick={()=>setFm(f=>({...f,li:f.li.filter((_,j)=>j!==i)}))}><X size={12}/></button></div>)}
        <div style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderTop:"2px solid rgba(52,211,153,0.15)"}}><span style={{fontWeight:700}}>Total</span><span style={{fontSize:16,fontWeight:800,color:"#34d399"}}>{fmt$(tot)}</span></div>
        <div style={st.fg}><label style={st.lb}>Notes</label><textarea style={st.ta} value={fm.n} onChange={e=>setFm({...fm,n:e.target.value})} rows={2}/></div>
        <div style={{display:"flex",gap:5}}>
          <button style={{...st.saveBtn,flex:1}} onClick={()=>svQ("draft")}>Draft</button>
          <button style={{...st.saveBtn,flex:1,background:"#60a5fa"}} onClick={()=>{svQ("sent");copy();}}>Save+Copy</button>
        </div>
      </>}
    </Modal>}
  </div>;
}

/* ═══ VOICE COMMAND (Big Green Talk Button) ═══ */
function TalkMode({data,setData,onClose}){
  const[msg,setMsg]=useState("");const[reply,setReply]=useState("");const[busy,setBusy]=useState(false);const[listening,setListening]=useState(false);
  const recRef=useRef(null);
  const startListen=()=>{
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SR){alert("Voice needs Chrome/Safari.");return;}
    const r=new SR();r.continuous=true;r.interimResults=true;r.lang="en-US";let fin="";
    r.onresult=e=>{let int="";for(let i=e.resultIndex;i<e.results.length;i++){if(e.results[i].isFinal)fin+=(fin?" ":"")+e.results[i][0].transcript;else int+=e.results[i][0].transcript;}setMsg(fin+(int?" "+int:""));};
    r.onerror=()=>setListening(false);r.onend=()=>setListening(false);
    recRef.current=r;try{r.start();setListening(true);}catch(e){}
  };
  const stopListen=()=>{if(recRef.current){try{recRef.current.stop();}catch(e){}recRef.current=null;}setListening(false);};
  const hist=data.jb.map(j=>`${j.cn}: ${(j.sv||[]).join(",")||"job"} ${j.h}h $${j.p} exp$${j.ex}`).join("; ");
  const schd=data.sc.filter(s=>s.st!=="completed").map(s=>`${s.cn} ${s.d} ${s.t||""} ${(s.sv||[]).join(",")}`).join("; ");
  const send=async()=>{
    if(!msg.trim()||busy)return;const q=msg;setMsg("");setBusy(true);stopListen();
    try{const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:600,
      system:`You are Cole's landscaping business assistant. Cole runs Cole's Landscape Co. in Waterford, Michigan. Be concise and direct - this is a mobile app.

Current schedule: ${schd}
Recent jobs: ${hist}
Today: ${new Date().toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric",year:"numeric"})}

Help Cole with:
- Pricing jobs (his helpers cost $20/hr, mulch ~$26/yd, dump $20, gas $15 per 20min drive)
- Scheduling advice
- Client communication drafts
- Quick answers about his business data
- General landscaping business advice

Keep responses SHORT - 2-3 sentences max. This is a phone app.`,
      messages:[{role:"user",content:q}]})});
      const d=await res.json();setReply(d.content?.map(x=>x.text||"").join("")||"Error");
    }catch(e){setReply("Connection error. Try again.");}
    setBusy(false);
  };
  return <div style={st.ov} onClick={onClose}>
    <div style={{...st.mod,maxHeight:"92vh"}} onClick={e=>e.stopPropagation()}>
      <div style={st.mh}><h3 style={{...st.mt,fontSize:15}}>Talk to Fieldwork</h3><button style={st.ib} onClick={()=>{stopListen();onClose();}}><X size={18}/></button></div>
      <div style={{...st.mb,display:"flex",flexDirection:"column"}}>
        <p style={{fontSize:12,color:"#6b7a8d",margin:"0 0 10px"}}>Tap the mic and talk — schedule jobs, get pricing, draft messages.</p>
        <p style={{fontSize:10,color:"#f59e0b",margin:"0 0 10px",padding:"4px 8px",background:"rgba(245,158,11,0.06)",borderRadius:5}}>Voice works after deploying to Vercel. In Claude preview, use the text box below.</p>

        {reply&&<div style={{padding:"10px 12px",borderRadius:10,background:"rgba(96,165,250,0.06)",border:"1px solid rgba(96,165,250,0.12)",marginBottom:12}}>
          <span style={{fontSize:9,fontWeight:700,color:"#60a5fa"}}>FIELDWORK</span>
          <p style={{fontSize:13,color:"#e2e8f0",margin:"4px 0 0",lineHeight:1.5,whiteSpace:"pre-wrap"}}>{reply}</p>
        </div>}

        {msg&&<div style={{padding:"10px 12px",borderRadius:10,background:"rgba(52,211,153,0.06)",border:"1px solid rgba(52,211,153,0.12)",marginBottom:12}}>
          <span style={{fontSize:9,fontWeight:700,color:"#34d399"}}>YOU</span>
          <p style={{fontSize:13,color:"#e2e8f0",margin:"4px 0 0",lineHeight:1.5}}>{msg}</p>
        </div>}

        {busy&&<p style={{textAlign:"center",fontSize:12,color:"#6b7a8d",padding:10}}>Thinking...</p>}

        <div style={{marginTop:"auto",paddingTop:12}}>
          {/* Big green mic button */}
          <div style={{display:"flex",justifyContent:"center",marginBottom:12}}>
            <button onClick={()=>{if(listening)stopListen();else startListen();}} style={{
              width:72,height:72,borderRadius:36,
              background:listening?"linear-gradient(135deg,#ef4444,#dc2626)":"linear-gradient(135deg,#34d399,#10b981)",
              border:listening?"3px solid rgba(239,68,68,0.3)":"3px solid rgba(52,211,153,0.3)",
              color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",
              boxShadow:listening?"0 0 30px rgba(239,68,68,0.4)":"0 0 30px rgba(52,211,153,0.3)",
              transition:"all 0.2s"
            }}>
              {listening?<Square size={28} fill="#fff"/>:<Mic size={28}/>}
            </button>
          </div>
          <p style={{textAlign:"center",fontSize:11,color:listening?"#ef4444":"#6b7a8d",fontWeight:600,marginBottom:10}}>
            {listening?"Listening... tap to stop":"Tap to talk"}
          </p>

          {/* Text input fallback */}
          <div style={{display:"flex",gap:4}}>
            <input style={{...st.inp,flex:1,fontSize:14,padding:"10px 12px"}} value={msg} onChange={e=>setMsg(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Or type here..."/>
            <button style={{padding:"10px 14px",borderRadius:7,background:"#34d399",color:"#0b0e13",border:"none",fontWeight:700,cursor:"pointer"}} onClick={send}><Send size={18}/></button>
          </div>
        </div>
      </div>
    </div>
  </div>;
}

/* ═══ APP ═══ */
export default function App(){
  const[data,setData]=useState(null);const[tab,setTab]=useState("home");const[showTalk,setShowTalk]=useState(false);
  useEffect(()=>{load().then(d=>{if(d&&d.jb&&d.jb.length>0)setData(d);else{setData(SEED);save(SEED);}});},[]);
  useEffect(()=>{if(!document.getElementById("fw-f")){const l=document.createElement("link");l.id="fw-f";l.rel="stylesheet";l.href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap";document.head.appendChild(l);}},[]);
  if(!data)return <div style={{fontFamily:"'Outfit',sans-serif",background:"#0b0e13",display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",flexDirection:"column",gap:6}}><img src={LOGO} alt="" style={{width:48,height:48,borderRadius:10,objectFit:"contain",background:"#fff"}}/><h1 style={{fontSize:18,fontWeight:900,color:"#34d399",letterSpacing:"0.1em",margin:0}}>FIELDWORK</h1></div>;
  const tabs=[
    {id:"home",icon:HomeIcon,l:"Home"},{id:"schedule",icon:Calendar,l:"Schedule"},
    {id:"clients",icon:Users,l:"Clients"},{id:"jobs",icon:ClipboardList,l:"Jobs"},{id:"quotes",icon:FileText,l:"Quotes"}
  ];
  return <div style={{fontFamily:"'Outfit',sans-serif",background:"#0b0e13",color:"#e2e8f0",minHeight:"100vh",maxWidth:480,margin:"0 auto",position:"relative"}}>
    <div style={{paddingBottom:80}}>
      {tab==="home"&&<HomePage data={data} go={setTab} onTalk={()=>setShowTalk(true)}/>}
      {tab==="schedule"&&<Sched data={data} setData={d=>{setData(d);save(d);}}/>}
      {tab==="clients"&&<ClientsPage data={data} setData={d=>{setData(d);save(d);}}/>}
      {tab==="jobs"&&<JobsPage data={data} setData={d=>{setData(d);save(d);}}/>}
      {tab==="quotes"&&<QuotesPage data={data} setData={d=>{setData(d);save(d);}}/>}
    </div>

    {/* Tab Bar */}
    <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,display:"flex",background:"rgba(11,14,19,.97)",backdropFilter:"blur(20px)",borderTop:"1px solid rgba(255,255,255,.06)",padding:"6px 0 env(safe-area-inset-bottom,8px)",zIndex:100}}>
      {tabs.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"6px 0",background:"none",border:"none",color:tab===t.id?"#34d399":"#4b5563",cursor:"pointer"}}>
        <t.icon size={22} strokeWidth={tab===t.id?2.5:1.8}/><span style={{fontSize:10,fontWeight:tab===t.id?700:500}}>{t.l}</span>
      </button>)}
    </div>

    {showTalk&&<TalkMode data={data} setData={d=>{setData(d);save(d);}} onClose={()=>setShowTalk(false)}/>}
  </div>;
}

const st={
  pg:{padding:"8px"},ph:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6},
  pt:{fontSize:17,fontWeight:800,color:"#f1f5f9",margin:0},
  stat:{background:"rgba(255,255,255,.025)",borderRadius:8,padding:"7px",border:"1px solid rgba(255,255,255,.035)"},
  stL:{display:"block",fontSize:8,color:"#5a6577",textTransform:"uppercase",fontWeight:700},
  stV:{display:"block",fontSize:15,fontWeight:800,color:"#f1f5f9"},
  pBtn:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:3,padding:"9px 0",background:"#34d399",color:"#0b0e13",border:"none",borderRadius:7,fontSize:11,fontWeight:700,cursor:"pointer"},
  sBtn:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:3,padding:"9px 0",background:"rgba(255,255,255,.05)",color:"#d1d5db",border:"none",borderRadius:7,fontSize:11,fontWeight:700,cursor:"pointer"},
  ab:{width:30,height:30,borderRadius:7,background:"#34d399",color:"#0b0e13",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},
  ib:{background:"none",border:"none",color:"#5a6577",cursor:"pointer",padding:2,display:"flex",alignItems:"center"},
  ibs:{background:"none",border:"none",color:"#3b4557",cursor:"pointer",padding:1,display:"flex",alignItems:"center"},
  sm:{display:"flex",alignItems:"center",gap:2,padding:"3px 6px",borderRadius:4,background:"rgba(255,255,255,.04)",color:"#c9cdd4",border:"none",fontSize:9,fontWeight:600,cursor:"pointer"},
  lnk:{background:"none",border:"none",color:"#34d399",fontSize:10,fontWeight:600,cursor:"pointer",padding:"3px 0"},
  saveBtn:{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:4,padding:"10px 0",background:"#34d399",color:"#0b0e13",border:"none",borderRadius:7,fontSize:12,fontWeight:700,cursor:"pointer",marginTop:3},
  sec:{marginBottom:10},secT:{fontSize:9,fontWeight:700,color:"#5a6577",marginBottom:4,textTransform:"uppercase",letterSpacing:".04em",display:"flex",alignItems:"center"},
  em:{color:"#2e3848",fontSize:10,textAlign:"center",padding:"8px 0"},
  cd:{background:"rgba(255,255,255,.025)",borderRadius:8,padding:"8px 9px",marginBottom:3,border:"1px solid rgba(255,255,255,.035)",cursor:"pointer"},
  cdT:{fontSize:12,fontWeight:700,color:"#f1f5f9",display:"block"},
  cdS:{display:"flex",alignItems:"center",gap:2,fontSize:10,color:"#5a6577",marginTop:1},
  sc:{background:"rgba(255,255,255,.025)",borderRadius:8,padding:"7px 9px",marginBottom:3,border:"1px solid rgba(255,255,255,.035)"},
  scN:{fontSize:12,fontWeight:700,color:"#f1f5f9",display:"block"},
  scM:{fontSize:9,color:"#5a6577",marginTop:1,display:"block"},
  gcB:{width:24,height:24,borderRadius:5,background:"rgba(96,165,250,.07)",color:"#60a5fa",border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",textDecoration:"none"},
  srB:{display:"flex",alignItems:"center",gap:5,background:"rgba(255,255,255,.025)",borderRadius:6,padding:"5px 7px",marginBottom:6,border:"1px solid rgba(255,255,255,.035)",color:"#5a6577"},
  srI:{flex:1,background:"none",border:"none",color:"#e2e8f0",fontSize:11,outline:"none"},
  ov:{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",backdropFilter:"blur(4px)",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"},
  mod:{background:"#111620",borderRadius:"12px 12px 0 0",width:"100%",maxWidth:480,maxHeight:"84vh",border:"1px solid rgba(255,255,255,.04)",borderBottom:"none",display:"flex",flexDirection:"column"},
  mh:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 9px 0"},
  mt:{fontSize:13,fontWeight:800,color:"#f1f5f9",margin:0},
  mb:{flex:1,overflowY:"auto",padding:"5px 9px 16px"},
  fg:{marginBottom:7},
  lb:{display:"flex",alignItems:"center",fontSize:8,fontWeight:700,color:"#5a6577",marginBottom:2,textTransform:"uppercase"},
  inp:{width:"100%",padding:"7px",background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.045)",borderRadius:5,color:"#e2e8f0",fontSize:12,outline:"none",boxSizing:"border-box"},
  ta:{width:"100%",padding:"7px",background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.045)",borderRadius:5,color:"#e2e8f0",fontSize:12,outline:"none",resize:"vertical",fontFamily:"inherit",boxSizing:"border-box",minHeight:36},
};
